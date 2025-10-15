document.addEventListener("DOMContentLoaded", () => {
    const posts = [
      {
        title: "전력반도체의 미래",
        category: "semiconductor",
        content: "전력반도체 산업의 최신 동향과 기술 전망...",
        tags: ["반도체", "기술"],
        image: "images/semiconductor.jpg"
      },
      {
        title: "빛과 그림자의 예술",
        category: "photography",
        content: "사진 작업에서 조명의 중요성과 활용법...",
        tags: ["사진", "예술"],
        image: "images/photography.jpg"
      },
      {
        title: "AI가 바꾸는 세상",
        category: "ai",
        content: "인공지능의 사회적 영향과 윤리적 이슈...",
        tags: ["AI", "윤리"],
        image: "images/ai.jpg"
      }
    ];
  
    const postsPerPage = 5;
    const blogPostsContainer = document.querySelector(".blog-posts");
    const paginationContainer = document.querySelector(".pagination");
  
    let currentPage = 1;
    const totalPages = Math.ceil(posts.length / postsPerPage);
  
    function renderPosts(page) {
      blogPostsContainer.innerHTML = "";
      const start = (page - 1) * postsPerPage;
      const end = start + postsPerPage;
      const postsToRender = posts.slice(start, end);
  
      postsToRender.forEach(post => {
        const article = document.createElement("article");
        article.classList.add(post.category);
  
        let tagsHTML = "";
        post.tags.forEach(tag => {
          tagsHTML += `<span class="tag">${tag}</span>`;
        });
  
        article.innerHTML = `
          <img src="${post.image}" alt="${post.title}" class="blog-image">
          <h2>${post.title}</h2>
          <p>${post.content}</p>
          <div class="tags">${tagsHTML}</div>
        `;
        blogPostsContainer.appendChild(article);
      });
  
      setupTagFiltering();
    }
  
    function renderPagination() {
      paginationContainer.innerHTML = "";
  
      for (let i = 1; i <= totalPages; i++) {
        const button = document.createElement("button");
        button.textContent = i;
        button.classList.add("page-btn");
        if (i === currentPage) button.classList.add("active");
  
        button.addEventListener("click", () => {
          currentPage = i;
          renderPosts(currentPage);
          renderPagination();
        });
  
        paginationContainer.appendChild(button);
      }
    }
  
    function setupTagFiltering() {
      const tags = document.querySelectorAll(".tag");
  
      tags.forEach(tag => {
        tag.addEventListener("click", () => {
          const tagText = tag.textContent;
          const posts = document.querySelectorAll(".blog-posts article");
  
          posts.forEach(post => {
            const postTags = Array.from(post.querySelectorAll(".tag")).map(tag => tag.textContent);
            if (postTags.includes(tagText)) {
              post.style.display = "block";
            } else {
              post.style.display = "none";
            }
          });
        });
      });
    }
  
    renderPosts(currentPage);
    renderPagination();
  });
  