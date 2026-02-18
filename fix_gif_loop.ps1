$path = "projects\OtokawaEngine\assets\GuizmoManipulating.gif"
if (-not (Test-Path $path)) {
    Write-Host "File not found: $path"
    exit 1
}

try {
    $bytes = [System.IO.File]::ReadAllBytes($path)

    # Check Header
    if ($bytes[0] -ne 0x47 -or $bytes[1] -ne 0x49 -or $bytes[2] -ne 0x46) {
        Write-Host "Not a GIF file"
        exit 1
    }

    # Ensure 89a
    if ($bytes[4] -eq 0x37) { # '7' in '87a'
        $bytes[4] = 0x39 # '9'
    }

    # Search for Netscape Block
    # NETSCAPE2.0 is 4E 45 54 53 43 41 50 45 32 2E 30
    # Full block start: 21 FF 0B "NETSCAPE2.0"
    $netscapeSig = @(0x21, 0xFF, 0x0B, 0x4E, 0x45, 0x54, 0x53, 0x43, 0x41, 0x50, 0x45, 0x32, 0x2E, 0x30)

    $foundIndex = -1
    for ($i = 0; $i -lt $bytes.Length - $netscapeSig.Length; $i++) {
        $match = $true
        for ($j = 0; $j -lt $netscapeSig.Length; $j++) {
            if ($bytes[$i + $j] -ne $netscapeSig[$j]) {
                $match = $false
                break
            }
        }
        if ($match) {
            $foundIndex = $i
            break
        }
    }

    if ($foundIndex -ne -1) {
        Write-Host "Found existing Netscape extension."
        $subBlockStart = $foundIndex + $netscapeSig.Length
        # Expected: 03 01 XX XX 00
        if ($bytes[$subBlockStart] -eq 0x03 -and $bytes[$subBlockStart+1] -eq 0x01) {
            $bytes[$subBlockStart+2] = 0x00
            $bytes[$subBlockStart+3] = 0x00
            Write-Host "Updated loop count to infinite."
        }
    } else {
        Write-Host "Inserting Netscape extension."
        # Find insertion point after GCT
        # LSD is at 6. Packed field at 10.
        $packed = $bytes[10]
        $hasGCT = ($packed -band 0x80) -ne 0
        $gctSizeExp = ($packed -band 0x07)
        $gctSize = if ($hasGCT) { 3 * [Math]::Pow(2, $gctSizeExp + 1) } else { 0 }
        
        $insertPos = 13 + $gctSize
        
        $newBlock = @(0x21, 0xFF, 0x0B) + [System.Text.Encoding]::ASCII.GetBytes("NETSCAPE2.0") + @(0x03, 0x01, 0x00, 0x00, 0x00)
        
        # Insert array into array
        $newBytes = $bytes[0..($insertPos-1)] + $newBlock + $bytes[$insertPos..($bytes.Length-1)]
        $bytes = [byte[]]$newBytes
    }

    [System.IO.File]::WriteAllBytes($path, $bytes)
    Write-Host "Done."
} catch {
    Write-Host "An error occurred: $_"
    exit 1
}
