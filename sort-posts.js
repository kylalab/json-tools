// /sort-posts.js
(function () {
  const getISODate = (el) => {
    if (el.dataset && el.dataset.date) return el.dataset.date;
    const t = el.querySelector('time[datetime]');
    if (t) return t.getAttribute('datetime');
    const m = (el.textContent || '').match(/\d{4}-\d{2}-\d{2}/);
    return m ? m[0] : '1970-01-01';
  };

  // 정렬 플래그가 있는 컨테이너 먼저 처리
  const containers = Array.from(document.querySelectorAll('[data-sort="desc-date"]'));
  containers.forEach(container => {
    const cards = Array.from(container.querySelectorAll('.post-card'));
    if (cards.length < 2) return;

    // 1) 최신순 정렬
    cards.sort((a, b) => new Date(getISODate(b)) - new Date(getISODate(a)));
    cards.forEach(card => container.appendChild(card));

    // 2) data-limit 적용
    const limitAttr = container.getAttribute('data-limit');
    if (limitAttr) {
      const limit = parseInt(limitAttr, 10);
      if (!Number.isNaN(limit) && limit > 0) {
        cards.forEach((card, idx) => {
          card.style.display = idx < limit ? '' : 'none';
        });

        // 3) "더보기" 버튼 삽입
        const moreHref = container.getAttribute('data-more-href') || '/posts/';
        const moreText = container.getAttribute('data-more-text') || '더보기';

        // 중복 생성 방지
        const already = container.nextElementSibling && container.nextElementSibling.classList.contains('more-wrap');
        if (!already) {
          const wrap = document.createElement('p');
          wrap.className = 'more-wrap';
          const a = document.createElement('a');
          a.className = 'btn btn-outline';   // 스타일은 기존 버튼 클래스 재사용
          a.href = moreHref;
          a.textContent = moreText;
          wrap.appendChild(a);
          container.parentNode.insertBefore(wrap, container.nextSibling);
        }
      }
    }
  });

  // (옵션) data-sort 래퍼가 없을 때 페이지 전체 카드 정렬도 유지하고 싶다면 아래 블록 유지
  if (containers.length === 0) {
    const cards = Array.from(document.querySelectorAll('.post-card'));
    if (cards.length > 1) {
      const parent = cards[0].parentNode;
      cards.sort((a, b) => new Date(getISODate(b)) - new Date(getISODate(a)));
      cards.forEach(c => parent.appendChild(c));
    }
  }
})();

