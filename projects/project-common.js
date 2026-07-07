// プロジェクトページ共通: 画像クリックで拡大表示するライトボックス
document.addEventListener('DOMContentLoaded', () => {
    const overlay = document.createElement('div');
    overlay.className = 'lightbox-overlay';
    overlay.innerHTML = `
        <button class="lightbox-close" aria-label="閉じる">&times;</button>
        <img alt="">
    `;
    document.body.appendChild(overlay);

    const overlayImg = overlay.querySelector('img');
    const closeBtn = overlay.querySelector('.lightbox-close');

    function openLightbox(img) {
        overlayImg.src = img.currentSrc || img.src;
        overlayImg.alt = img.alt;
        overlay.classList.add('active');
    }

    function closeLightbox() {
        overlay.classList.remove('active');
    }

    document.querySelectorAll('.content img, .thumbnail img').forEach(img => {
        img.addEventListener('click', () => openLightbox(img));
    });

    overlay.addEventListener('click', (e) => {
        if (e.target === overlay || e.target === closeBtn || e.target === overlayImg) {
            closeLightbox();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeLightbox();
    });
});
