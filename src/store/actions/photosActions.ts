import {createClient, ErrorResponse, Photos, PhotosWithTotalResults} from "pexels";
import {ThunkAction} from "redux-thunk";
import {RootState} from "../index";
import {GET_PHOTOS, PhotosAction, SET_ERROR} from "../types";


const client = createClient('563492ad6f91700001000001515a20bbb2e84744a03a7e6c082810a8')

export const getPhotos = (page: number, searchQuery: string, onSuccess: () => void, onError: () => void): ThunkAction<void, RootState, null, PhotosAction> => {
    return async dispatch => {
        try {
            const photos: PhotosWithTotalResults | ErrorResponse = await client.photos.search({
                page,
                query: searchQuery,
                per_page: 10
            })
            if ('error' in photos) {
                throw new Error(photos.error)
            } else {
                dispatch({
                    type: GET_PHOTOS,
                    payload: {
                        photos: photos.photos,
                        page,
                        total_results: photos.total_results,
                    }
                })
                onSuccess()
            }
        } catch (err) {
            dispatch(setError('error'))
            onError()
        }
    }
}

export const getCreatedPhotos = (page: number, onSuccess: () => void, onError: () => void): ThunkAction<void, RootState, null, PhotosAction> => {
    return async dispatch => {
        try {
            const photos: Photos | ErrorResponse = await client.photos.curated({page, per_page: 10})
            if ('error' in photos) {
                throw new Error(photos.error)
            } else {
                dispatch({
                    type: GET_PHOTOS,
                    payload: {
                        photos: photos.photos,
                        page,
                        total_results: 0,
                    }
                })
                onSuccess()
            }
        } catch (err) {
            dispatch(setError('error'))
            onError()
        }
    }
}

export const setError = (err: string): PhotosAction => {
    return {
        type: SET_ERROR,
        payload: err,
    }
}












