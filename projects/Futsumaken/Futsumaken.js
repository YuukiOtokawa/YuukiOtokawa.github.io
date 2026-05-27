// auto-p クラスがついた要素内のテキストを空行区切りで自動的に<p>タグでラップ
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.auto-p').forEach(el => {
        const text = el.textContent.trim();
        const paragraphs = text.split(/\n\s*\n/).map(p => p.trim()).filter(p => p);
        el.innerHTML = paragraphs.map(p => `<p>${p}</p>`).join('');
    });

    // GIF画像を無限ループさせる処理
    document.querySelectorAll('img[src$=".gif"]').forEach(img => {
        makeGifLoop(img);
    });
});

async function makeGifLoop(imgElement) {
    try {
        const response = await fetch(imgElement.src);
        if (!response.ok) return;
        const buffer = await response.arrayBuffer();
        const u8 = new Uint8Array(buffer);

        // GIFヘッダーチェック
        if (u8[0] !== 0x47 || u8[1] !== 0x49 || u8[2] !== 0x46) return; // 'GIF'

        // バージョンを89aにする (拡張ブロック対応のため)
        if (u8[4] === 0x37) u8[4] = 0x39; // '7' -> '9'

        const netscapeSig = [0x21, 0xFF, 0x0B, 0x4E, 0x45, 0x54, 0x53, 0x43, 0x41, 0x50, 0x45, 0x32, 0x2E, 0x30];
        let foundIndex = -1;

        for (let i = 0; i < u8.length - netscapeSig.length; i++) {
            let match = true;
            for (let j = 0; j < netscapeSig.length; j++) {
                if (u8[i + j] !== netscapeSig[j]) {
                    match = false;
                    break;
                }
            }
            if (match) {
                foundIndex = i;
                break;
            }
        }

        let newU8;

        if (foundIndex !== -1) {
            const subBlockStart = foundIndex + netscapeSig.length;
            newU8 = new Uint8Array(u8);
            if (newU8[subBlockStart] === 0x03 && newU8[subBlockStart + 1] === 0x01) {
                newU8[subBlockStart + 2] = 0x00;
                newU8[subBlockStart + 3] = 0x00;
            }
        } else {
            const packed = u8[10];
            const hasGCT = (packed & 0x80) !== 0;
            const gctSizeExp = (packed & 0x07);
            const gctSize = hasGCT ? 3 * Math.pow(2, gctSizeExp + 1) : 0;
            const insertPos = 13 + gctSize;

            const extensionBlock = new Uint8Array([
                0x21, 0xFF, 0x0B,
                0x4E, 0x45, 0x54, 0x53, 0x43, 0x41, 0x50, 0x45, 0x32, 0x2E, 0x30,
                0x03, 0x01, 0x00, 0x00,
                0x00
            ]);

            newU8 = new Uint8Array(u8.length + extensionBlock.length);
            newU8.set(u8.subarray(0, insertPos), 0);
            newU8.set(extensionBlock, insertPos);
            newU8.set(u8.subarray(insertPos), insertPos + extensionBlock.length);
        }

        const blob = new Blob([newU8], { type: 'image/gif' });
        const objUrl = URL.createObjectURL(blob);
        imgElement.src = objUrl;

    } catch (e) {
        console.warn('GIF loop patch failed for:', imgElement.src, e);
    }
}
