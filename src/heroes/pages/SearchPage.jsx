import React from 'react'
import { HeroCard } from '../components'
import { useForm } from '../../../src/hooks/useForm'
import { useLocation, useNavigate } from 'react-router-dom'
import queryString from 'query-string'
import { getHerosByName } from '../helpers'

export const SearchPage = () => {

  const navigate = useNavigate();
  const location = useLocation();

  const {q = ''} = queryString.parse(location.search);

  const heroes = getHerosByName(q);

  const {onInputChange, searchText} = useForm({
    searchText: q,
  });

  const onSearchSubmit = (e) => {
    e.preventDefault();

    if(searchText.trim().length <= 1) return;

    navigate(`?q=${searchText.toLowerCase().trim()}`);
  }

  return (
    <>
      <h1>Página de busqueda</h1>
      <hr />

      <div className="row">
        <div className="col-5">
          <h4>Busqueda</h4>
          <form aria-label='form' onSubmit={onSearchSubmit}>
            <input 
              type="text" 
              name="searchText"
              placeholder='Busca un héroe'
              className='form-control'
              autoComplete='off'
              value={searchText}
              onChange={onInputChange}
            />

            <button
              className='btn btn-outline-primary mt-2'
            >
              Buscar
            </button>
          </form>
        </div>

        <div className="col-7">
          <h4>Resultados</h4>
          <hr />

          <div className="alert alert-primary" style={{display: (q !== '') ? 'none' : ''}}>Busca un heroe</div>

          <div aria-label='alert' className="alert alert-danger" style={{display: (heroes.length === 0 && q !== '') ? '' : 'none'}}>Heroe no encontrado</div>
          
          {
            heroes.map(hero => (
              <HeroCard key={hero.id} hero={hero} />
            ))
          }

        </div>
      </div>
    </>
  )
}
