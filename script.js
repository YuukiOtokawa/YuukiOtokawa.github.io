// #region createProjectCard

// プロジェクトカードのHTMLを生成する関数
function createProjectCard(project) {
    return `
    <a href="${project.pageLink}" class="project-card-link">
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

// #endregion

// #region projectGrid

// プログラム作品と、チーム開発・進行管理をまとめたページを3列グリッドで表示する
function initializeProjectGrid() {
    const board = document.getElementById('kanban-board');
    if (!board) return;

    board.innerHTML = projectCardData.projects.map(project => createProjectCard(project)).join('');
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
    initializeProjectGrid();
    renderSkills();
    initializeFooter();
});
