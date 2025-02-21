// 영화 등록 버튼 클릭 핸들러
document.getElementById('createBtn').addEventListener('click', async () => {
    // 폼에서 영화 정보 가져오기
    const title = document.getElementById('newTitle').value;
    const author = document.getElementById('newAuthor').value;
    const year = document.getElementById('newYear').value;
    const genre = document.getElementById('newGenre').value;
    const summary = document.getElementById('newSummary').value;
  
    // 필수 입력 확인
    if (!title || !author || !year || !genre || !summary) {
      alert('영화 제목, 감독, 제작 연도, 장르, 영화 요약을 모두 입력하세요.');
      return;
    }
    
    try {
      // POST /movies API 호출하여 영화 등록
      const response = await fetch('/movies', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title, author, year, genre, summary })
      });
      
      if (response.ok) {
        const newMovie = await response.json();
        alert(`영화 등록 성공: ${newMovie.title}`);
        // 등록 후 입력 폼 초기화
        document.getElementById('newTitle').value = '';
        document.getElementById('newAuthor').value = '';
        document.getElementById('newYear').value = '';
        document.getElementById('newGenre').value = '';
        document.getElementById('newSummary').value = '';
        // 필요하다면 검색 결과 갱신 또는 전체 영화 목록 재조회 로직 추가
      } else {
        const errorData = await response.json();
        alert(`영화 등록 실패: ${errorData.error}`);
      }
    } catch (error) {
      console.error('등록 중 오류 발생:', error);
    }
  });
  

  // 영화 검색 버튼 클릭 핸들러
document.getElementById('searchBtn').addEventListener('click', async () => {
    const title = document.getElementById('titleInput').value;
    // 검색어가 있으면 쿼리 파라미터에 포함, 없으면 전체 조회
    const url = title ? `/movies?title=${encodeURIComponent(title)}` : '/movies';
    
    try {
      const response = await fetch(url);
      const movies = await response.json();
      
      const resultsDiv = document.getElementById('results');
      resultsDiv.innerHTML = '';
      
      if (movies.length === 0) {
        resultsDiv.textContent = '검색 결과가 없습니다.';
      } else {
        movies.forEach(movie => {
          const div = document.createElement('div');
          div.className = 'result-item';
          // 각 영화 포스터 박스에 영화 정보와 삭제 버튼 추가
          div.innerHTML = `
            <h3>${movie.title}</h3>
            <p>장르: ${movie.genre}</p>
            <p>감독: ${movie.author}</p>
            <button class="delete-button">삭제</button>
          `;
          // 삭제 버튼 이벤트 등록
          const deleteBtn = div.querySelector('.delete-button');
          deleteBtn.addEventListener('click', async () => {
            if (confirm(`"${movie.title}" 영화를 삭제하시겠습니까?`)) {
              try {
                const delResponse = await fetch(`/movies/${movie._id}`, { method: 'DELETE' });
                if (delResponse.ok) {
                  alert('영화 삭제 성공');
                  div.remove();
                } else {
                  alert('영화 삭제 실패');
                }
              } catch (error) {
                console.error('삭제 중 오류 발생:', error);
              }
            }
          });
          resultsDiv.appendChild(div);
        });
      }
    } catch (error) {
      console.error('검색 중 오류 발생:', error);
    }
  });
  
  