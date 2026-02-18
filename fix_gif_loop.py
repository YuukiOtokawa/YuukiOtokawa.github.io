import os
import struct

def add_loop_to_gif(filepath):
    with open(filepath, 'rb') as f:
        data = bytearray(f.read())

    # Check header
    if data[:3] != b'GIF':
        print("Error: Not a GIF file")
        return

    version = data[3:6]
    if version == b'87a':
        # Upgrade version to 89a for extension support
        data[3:6] = b'89a'

    # Search for Netscape Application Extension
    netscape_sig = b'\x21\xFF\x0BNETSCAPE2.0'
    index = data.find(netscape_sig)

    if index != -1:
        print("Found existing Netscape extension, updating loop count...")
        # Expected structure: 
        # [Extension Introducer 0x21] [Label 0xFF] [Block Size 0x0B] [NETSCAPE2.0]
        # [Sub-block Size 0x03] [Sub-block ID 0x01] [Loop Check] [Loop Check] [Terminator 0x00]
        
        # index points to 0x21
        sub_block_start = index + len(netscape_sig)
        
        # Verify sub-block structure
        if len(data) > sub_block_start + 4:
            # Check sub-block size (0x03) and ID (0x01)
            # Some implementations might vary, but standard is 0x03 0x01
            if data[sub_block_start] == 0x03 and data[sub_block_start+1] == 0x01:
                # Set loop count to 0 (infinite)
                data[sub_block_start+2] = 0x00
                data[sub_block_start+3] = 0x00
                print("Loop count set to 0 (infinite).")
            else:
                print("Warning: unexpected sub-block structure, attempting to insert new block anyway.")
                # Fallback to insertion if structure is weird
                index = -1
        else:
            index = -1

    if index == -1:
        print("Inserting Netscape extension...")
        # Find insertion point: after Global Color Table (if present)
        # LSD is at offset 6, length 7
        lsd = data[6:13]
        packed_field = lsd[4]
        
        has_gct = (packed_field & 0x80) != 0
        gct_size_exp = (packed_field & 0x07)
        gct_size = 3 * (2 ** (gct_size_exp + 1)) if has_gct else 0
        
        insert_pos = 13 + gct_size
        
        # Construct Netscape Extension Block
        # 0x21, 0xFF, 0x0B, "NETSCAPE2.0", 0x03, 0x01, 0x00, 0x00, 0x00
        extension_block = (
            b'\x21\xFF\x0BNETSCAPE2.0'  # Header
            b'\x03\x01'                 # Sub-block len 3, ID 1
            b'\x00\x00'                 # Loop count 0 (infinite)
            b'\x00'                     # Block Terminator
        )
        
        data[insert_pos:insert_pos] = extension_block
        print(f"Inserted extension at offset {insert_pos}.")

    with open(filepath, 'wb') as f:
        f.write(data)
    print("Done.")

if __name__ == '__main__':
    target_path = r'projects\OtokawaEngine\assets\GuizmoManipulating.gif'
    if os.path.exists(target_path):
        add_loop_to_gif(target_path)
    else:
        # Try finding it if relative path is different
        # In the find_by_name output: projects\OtokawaEngine\assets\GuizmoManipulating.gif
        # This assumes script is run from Portfolio root
        print(f"File not found at {target_path}")
