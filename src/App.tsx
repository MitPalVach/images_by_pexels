import React, {FC, useState} from 'react';
import './App.css';
import Intro from "./components/intro";
import Masonry, {ResponsiveMasonry} from 'react-responsive-masonry';
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "./store";
import {getPhotos, setError} from "./store/actions/photosActions";


const App: FC = () => {
    const dispatch = useDispatch()
    const {photos, total_results, error} = useSelector((state: RootState) => state.photos)
    const [mode, setMode] = useState('trending')
    const [loading, setLoading] = useState(false)
    const [searchFor, setSearchFor] = useState('')
    const [page, setPage] = useState(1)
    const [title, setTitle] = useState('Популярные')

    const searchPhotoHandler = (query: string) => {
        if (error) {
            setError('')
        }
        setMode('search')
        setLoading(true)
        setSearchFor(query)
        setPage(1)
        dispatch(getPhotos(1, query, () => setLoading(false), () => setLoading(false)))
        setTitle(`Результат поиска для запроса - '${query}'`)
    }

    let content = null

    if (loading) {
        content = <div className='is-flex is-justify-content-center py-6'>
            <div className='loading'></div>
        </div>
    } else {
        content = (
            error
                ? <div className='notification is-danger mt-6 has-text-centered'>{error}</div>
                : <>
                    <h2 className='is-size-1 has-text-centered py-6'>{title}</h2>
                    {photos.length > 0
                        ? <ResponsiveMasonry columnsCountBreakPoints={{480: 2, 900: 5}}>
                            <Masonry gutter={20}>
                                {photos.map(photo => (
                                    <div key={photo.id} className='masonry-item'>
                                        <a href="/#" onClick={(e) => {
                                        }}>
                                            <img src={photo.src.large} alt=""/>
                                        </a>
                                    </div>
                                ))}
                            </Masonry>
                        </ResponsiveMasonry>
                        : <p className='has-text-centered'>Поиск не дал результатов</p>
                    }
                    <div className="is-flex is-justify-content-center py-6">
                        {((total_results > page * 20 || mode === 'trending')
                            && <button className='button is-primary is-large'>Загрузить еще</button>)}
                    </div>
                </>
        )
    }

    return (
        <div>
            <Intro onSearch={searchPhotoHandler}/>
            <div className='container px-4'>
                {content}
            </div>
        </div>
    );
};

export default App;