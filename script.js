const carousel = document.querySelector('.carousel');
const carouselContainer = document.querySelector('.carousel-container');
const cards = document.querySelectorAll('.project-card');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');




// #region createProjectCard

// プロジェクトカードのHTMLを生成する関数
function createProjectCard(project) {
    return `
    <a href="${project.pageLink}" class="project-card-link">
        <div class="project-card">
            <img src="${project.cardThumbnail}" alt="${project.title}">
            <h3>${project.title}</h3>
            <p>${project.detail}</p>
            <ul>
                ${project.features.map(feature => `<li>${feature}</li>`).join('')}
            </ul>
            <p class="tech">${project.tech}</p>
            <p class="repository">Repository</p>
            <p class="repo-link">${project.Repository ? `<a href="${project.Repository}" target="_blank">GitHub Repository</a>` : 'No repository available'}</p>
        </div>
    </a>
    `;
}

// カルーセル初期化
function initializeCarousel() {

    let cardsHTML = '';

    // 前方複製
    cardsHTML += projectCardData.projects.map(createProjectCard).join('');
    // 本体
    cardsHTML += projectCardData.projects.map(createProjectCard).join('');
    // 後方複製
    cardsHTML += projectCardData.projects.map(createProjectCard).join('');
    carousel.innerHTML = cardsHTML;
}

// #endregion

// #region profileInitialize

function initializeProfile() {
    const profImg = document.querySelector('.profile-image img');

    if (profImg) {
        profImg.src = images.ProfileImage;
        profImg.alt = "Profile Image";
    }

    const headerTitle = document.querySelector('header p');
    if (headerTitle) {
        headerTitle.textContent = profile.name;
    }
}

// #endregion

// #region carouselAnimation

function setupCarouselAnimation() {
    const parameter = document.querySelector(':root');

    const carousel = document.querySelector('.carousel');
    const carouselContainer = document.querySelector('.carousel-container');
    const cards = document.querySelectorAll('.project-card');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    if (!carousel || cards.length === 0) return;

    const rootStyles = getComputedStyle(document.documentElement);
    const cardGapValue = rootStyles.getPropertyValue('--cardGap').trim();
    const cardGap = parseInt(cardGapValue); // カード間のギャップ

    const cardWidth = cards[0].offsetWidth + cardGap; // カードの幅＋マージン
    const realCards = projectCardData.projects.length; // 実際のカード数
    let currentIndex = realCards; // オリジナルの最初のカード（index=realCards）
    let isAnimating = false;
    let autoScrollInterval;

    function getOffset() {
        const containerWidth = carouselContainer.offsetWidth;
        const cardActualWidth = cards[0].offsetWidth;
        return (containerWidth - cardActualWidth) / 2;
    }

    function moveToIndex(index, withAnimation = true) {
        if (isAnimating && withAnimation) return;

        isAnimating = true;

        carousel.style.transition = withAnimation ? 'transform 0.6s ease' : 'none';
        const offset = getOffset();
        const translateX = -(index * cardWidth) + offset;
        carousel.style.transform = `translateX(${translateX}px)`;

        setTimeout(() => {
            isAnimating = false;
        }, withAnimation ? 600 : 50);
    }

    setTimeout(() => {
        moveToIndex(currentIndex, false);
    }, 100);

    function goNext() {
        if (isAnimating) return;

        currentIndex++;
        moveToIndex(currentIndex);

        if (currentIndex > realCards * 2 - 1) {
            setTimeout(() => {
                currentIndex = realCards;
                moveToIndex(currentIndex, false);
            }, 650);
        }
    }

    function goPrev() {
        if (isAnimating) return;
        currentIndex--;
        moveToIndex(currentIndex);
        if (currentIndex < realCards) {
            setTimeout(() => {
                currentIndex = realCards * 2 - 1;
                moveToIndex(currentIndex, false);
            }, 650);
        }
    }

    function autoScroll() {
        goNext();
    }

    function startAutoScroll() {
        stopAutoScroll();
        autoScrollInterval = setInterval(autoScroll, 3000);
    }

    function stopAutoScroll() {
        if (autoScrollInterval) {
            clearInterval(autoScrollInterval);
        }
    }

    nextBtn.addEventListener('click', () => {
        stopAutoScroll();
        goNext();
        startAutoScroll();
    });

    prevBtn.addEventListener('click', () => {
        stopAutoScroll();
        goPrev();
        startAutoScroll();
    });

    carousel.addEventListener('mouseenter', stopAutoScroll);
    carousel.addEventListener('mouseleave', startAutoScroll);

    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            moveToIndex(currentIndex, false);
        }, 100);
    });

    setTimeout(startAutoScroll, 1500);
}

document.addEventListener('DOMContentLoaded', () => {
    initializeProfile();
    initializeCarousel();
    setupCarouselAnimation();
});



// #endregion