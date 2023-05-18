import { FormEvent, useState } from 'react'
import { Result } from '../../models/externalSearch'
import { getArtworksFromSearch } from '../apis/search'
import LoadingSpinner from './LoadingSpinner'

export default function Search() {
  const [search, setSearch] = useState('')
  const [artworks, setArtworks] = useState<Result[] | null>(null)
  const [loading, setIsLoading] = useState(false)
  const [error, setError] = useState(false)

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setSearch(event.target.value)
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault()
    setIsLoading(true)
    getArtworksFromSearch(search)
      .then((response) => {
        setArtworks(response)
        setIsLoading(false)
        setSearch('')
      })
      .catch((err: Error) => {
        console.log(err)
        setError(true)
        setIsLoading(false)
      })
  }

  return (
    <div className="min-h-screen">
      <div className="flex">
        <h1 className="text-2xl font-extrabold">Search for Artworks</h1>
        <form className="w-1/2 rounded-md" onSubmit={handleSubmit}>
          <input
            type="text"
            className="text-l ml-10 rounded border-2 border-black p-2 focus:border-my-gold focus:outline-my-gold"
            value={search}
            onChange={handleChange}
          />
          <button
            type="submit"
            className="ml-2 rounded-md bg-my-gold p-2 text-white hover:border-2 hover:border-my-gold hover:bg-white hover:text-my-gold"
          >
            Submit
          </button>
        </form>
      </div>
      {loading && <LoadingSpinner />}
      {error ? (
        <div className="mt-10 flex w-full justify-center">
          <p className="text-2xl font-bold text-red-500">An error occurred</p>
        </div>
      ) : (
        <div className="h-full w-full">
          {artworks?.length === 0 ? (
            <div className="mt-10 flex w-full justify-center">
              <p className="text-2xl font-bold text-red-500">
                Your search returned no artworks from Artsy&apos;s API
              </p>
            </div>
          ) : (
            <div className="mt-8 flex h-fit flex-row flex-wrap gap-y-8 gap-x-12">
              {artworks?.map((art) => (
                <div
                  className="flex h-1/3 w-1/3 flex-col items-center justify-center"
                  key={art.title}
                >
                  <a
                    href={art._links.permalink.href}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <h3 className="w-72 text-xl font-bold hover:text-my-gold">
                      {art.title}
                    </h3>
                  </a>

                  <img
                    className="my-4 h-72 w-72 object-cover"
                    src={art._links.thumbnail.href}
                    alt={art.og_type}
                  />

                  <p className="w-72 text-sm">{art?.description}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
