const images = {

}

// auto-p クラスがついた要素内のテキストを空行区切りで自動的に<p>タグでラップ
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.auto-p').forEach(el => {
        const text = el.textContent.trim();
        const paragraphs = text.split(/\n\s*\n/).map(p => p.trim()).filter(p => p);
        el.innerHTML = paragraphs.map(p => `<p>${p}</p>`).join('');
    });
});