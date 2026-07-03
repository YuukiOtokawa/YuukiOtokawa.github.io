const carousel = document.querySelector('.carousel');
const carouselContainer = document.querySelector('.carousel-container');
const cards = document.querySelectorAll('.project-card');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');




// #region createProjectCard

// プロジェクトカードのHTMLを生成する関数
function createProjectCard(project, isDuplicate = false) {
    return `
    <a href="${project.pageLink}" class="project-card-link"${isDuplicate ? ' aria-hidden="true" tabindex="-1"' : ''}>
        <div class="project-card" style="background-image: url('${project.cardThumbnail}');">
            <div class="project-card-content">
                <h3>${project.title}</h3>
                <p class="project-detail">${project.detail}</p>
                <div class="project-tags">
                    ${project.features.map(feature => `<span class="tag">${feature}</span>`).join('')}
                </div>
            </div>
        </div>
    </a>
    `;
}

// カルーセル初期化
function initializeCarousel() {

    let cardsHTML = '';

    // 前方複製（無限ループ用の見た目だけの複製なのでスクリーンリーダーからは隠す）
    cardsHTML += projectCardData.projects.map(project => createProjectCard(project, true)).join('');
    // 本体
    cardsHTML += projectCardData.projects.map(project => createProjectCard(project, false)).join('');
    // 後方複製
    cardsHTML += projectCardData.projects.map(project => createProjectCard(project, true)).join('');
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

    const realCards = projectCardData.projects.length; // 実際のカード数

    // cardWidthを動的に取得する関数
    function getCardWidth() {
        const rootStyles = getComputedStyle(document.documentElement);
        const cardGapValue = rootStyles.getPropertyValue('--cardGap').trim();
        const cardGap = parseInt(cardGapValue);
        return cards[0].offsetWidth + cardGap;
    }

    let currentIndex = realCards; // オリジナルの最初のカード（index=realCards）
    let isAnimating = false;
    let autoScrollInterval;

    function moveToIndex(index, withAnimation = true) {
        if (isAnimating && withAnimation) return;

        isAnimating = true;

        carousel.style.transition = withAnimation ? 'transform 0.6s ease' : 'none';
        // 毎回最新の値を取得
        const cardWidth = getCardWidth();
        const containerWidth = carouselContainer.offsetWidth;
        const cardActualWidth = cards[0].offsetWidth;
        const offset = (containerWidth - cardActualWidth) / 2;
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

    // モーション低減を希望するユーザーには自動スクロールを行わない
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!prefersReducedMotion) {
        setTimeout(startAutoScroll, 1500);
    }
}



// #region Skills Graph

// #region Skills Graph

/*
  Categories:
  1. Programming Languages
  2. Game Engines
  3. Frameworks / Libraries
  4. Tools
*/
const skillCategories = [
    {
        title: "プログラミング言語",
        type: "graph",
        items: [
            { name: "C++", score: 9 },
            { name: "C#", score: 9 },
            { name: "C", score: 8 },
            { name: "HLSL", score: 6 }
        ]
    },
    {
        title: "ゲームエンジン",
        type: "graph",
        items: [
            { name: "Unity", score: 8 },
            { name: "Unreal Engine", score: 7 }
        ]
    },
    {
        title: "フレームワーク・ライブラリ",
        type: "list",
        items: [
            { name: "DirectX11" },
			{ name: "ImGui" },
			{ name: "Runtime Compiled C++" },
        ]
    },
    {
        title: "ツール",
        type: "list",
        items: [
            { name: "Git" },
			{ name: "Visual Studio" },
			{ name: "Rider" },
        ]
    }
];

function renderSkills() {
    const container = document.getElementById('skill-container');
    if (!container) return;

    container.innerHTML = skillCategories.map(category => {
        const itemsHTML = category.items.map(skill => {
            if (category.type === 'graph') {
                const blocks = Array(10).fill(0).map((_, i) =>
                    `<div class="skill-block ${i < skill.score ? 'filled' : ''}"></div>`
                ).join('');

                return `
                <li>
                    <div class="skill-item">
                        <div class="skill-info">
                            <span>${skill.name}</span>
                            <span class="skill-score">${skill.score}/10</span>
                        </div>
                        <div class="skill-graph">
                            ${blocks}
                        </div>
                    </div>
                </li>
                `;
            } else {
                // List type
                return `<li class="skill-list-item">${skill.name}</li>`;
            }
        }).join('');

        return `
        <div class="skill-category">
            <h3>${category.title}</h3>
            <ul class="${category.type === 'list' ? 'skill-simple-list' : ''}">
                ${itemsHTML}
            </ul>
        </div>
        `;
    }).join('');
}

// #endregion

// #region footerInitialize

function initializeFooter() {
    const footer = document.querySelector('footer p');
    if (!footer) return;

    footer.innerHTML = `
        📧 Email: <a href="mailto:${links.Email}">${links.Email}</a>
        | GitHub: <a href="${links.GitHub}" target="_blank" rel="noopener">@YuukiOtokawa</a>
    `;
}

// #endregion

document.addEventListener('DOMContentLoaded', () => {
    initializeProfile();
    initializeCarousel();
    setupCarouselAnimation();
    renderSkills();
    initializeFooter();
});



// #endregion