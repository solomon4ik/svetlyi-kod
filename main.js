'use strict';
window.onload = function () {
    let baseUrl = 'https://api.themoviedb.org/3';
    let apiKey = 'db2ade1028a9ab68c675e0e1637ba200';
    let list_movie = document.getElementById('list-movies');
    let info_movie = document.getElementById('info-movie');
    let loading = document.getElementById('loading');
    let btnSearch = document.getElementById('btnSearch');

    btnSearch.onclick = search;
    //search();

    function search() {
        list_movie.innerHTML = "";
        progress_toggle();
        fetch(`${baseUrl}/trending/movie/week?api_key=${apiKey}`)
            .then(function (response) {
                console.log('-------Content-Type---------', response.headers.get('Content-Type')); // application/json; charset=utf-8
                console.log('------status--------', response.status); // 200

                return response.json();
            })
            .then(function (data) {
                console.log('--------data by server---------', data);
                let list = data.results;
                
                for (let i = 0; i < list.length; i++) {
                    let li = document.createElement('li')
                    li.className = "movie";
                    
                    li.innerHTML = `<a href="#" data-id="${list[i].id}" class="user-movie moview_link">${list[i].title}</a>`;
                    list_movie.appendChild(li);
                    //console.log("list["+i+"]", list[i])
                }

                progress_toggle();
                show_list();

                var moview_links = document.querySelectorAll('.moview_link');
                for (var i = 0; i < moview_links.length; i++) {
                    moview_links[i].addEventListener('click', function (event) {
                        let id = this.getAttribute("data-id")
                        getMovie(id);

                    });
                }


            })
            .catch(alert);
    }
    //Показати фільм
    function getMovie(id) {
        progress_toggle();
        fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`)
            .then(function (response) {
                console.log('-------Content-Type---------', response.headers.get('Content-Type')); // application/json; charset=utf-8
                console.log('------status--------', response.status); // 200

                return response.json();
            })
            .then(function (movie) {
                progress_toggle();
                show_movie();
                console.log('--------movie------', movie);
                let html = 
                `<img src="https://image.tmdb.org/t/p/w500${movie.poster_path}"  />
                    <h1>${movie.title}</h1>
                    <p>
                        ${movie.overview}
                    </p>
                    <h2>Recomendations</h2>
                    <ul>
                        <li>
                            Film
                        </li>
                        <li>
                            Film2
                        </li>
                    </ul>`
                info_movie.innerHTML = html;
                //alert(user.name); // iliakan
            })
            .catch(alert);
    }

    function progress_toggle() {
        if (loading.style.display === "none") {
            loading.style.display = "block";
        } else {
            loading.style.display = "none";
        }
    }

    function show_list() {
        if (list_movie.style.display === "none") {
            list_movie.style.display = "block";
        }
        if (info_movie.style.display === "block") {
            info_movie.style.display = "none";
        }
    }

    function show_movie() {
        if (list_movie.style.display === "block") {
            list_movie.style.display = "none";
        }
        if (info_movie.style.display === "none") {
            info_movie.style.display = "block";
        }
    }
    var searchMovies = document.querySelector('#search-movies'),
        movies = document.querySelectorAll('.movie'),
        moviesData = document.querySelectorAll('.user-movie'),
        searchVal;

        searchMovies.addEventListener('keydown', function() {
            searchVal = this.value.toLowerCase();

                for (var i = 0; i < movies.length; i++) {
                    if (!searchVal || moviesData[i].textContent.toLowerCase().indexOf(searchVal) > -1) {
                        movies[i].style['display'] = 'flex';
                    }
                    else {
                        ovies[i].style['display'] = 'none';
                    }
                }
        });




}
