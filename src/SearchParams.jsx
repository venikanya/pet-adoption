import { useState, useContext } from 'react'
import useBreedList from './useBreedList'
import Results from './Results'
import { useQuery } from '@tanstack/react-query'
import fetchSearch from './fetchSearch'
import AdoptedPetContext from './AdoptedPetContext'
import Pet from './Pet'

const ANIMALS = ['', 'bird', 'cat', 'dog', 'rabbit', 'reptile']
const SearchParams = () => {
    const [reqParams, setRequestParams] = useState({
        location: '',
        animal: '',
        breed: '',
    })
    const [animal, setAnimal] = useState('')
    const [breeds] = useBreedList(animal)

    const results = useQuery(['search', reqParams], fetchSearch)
    const [adoptedPet] = useContext(AdoptedPetContext)

    return (
        <div className="search-params">
            <form
                onSubmit={(e) => {
                    e.preventDefault()
                    const formData = new FormData(e.target)
                    const obj = {
                        animal: formData.get('animal') ?? '',
                        breed: formData.get('breed') ?? '',
                        location: formData.get('location') ?? '',
                    }
                    setRequestParams(obj)
                }}
            >
                {adoptedPet ? (
                    <div className="pet image-container">
                        <img src={adoptedPet.images[0]} alt={adoptedPet.name} />
                    </div>
                ) : null}
                <label htmlFor="location">
                    Location
                    <input
                        id="location"
                        name="location"
                        placeholder="Location"
                    />
                </label>
                <label htmlFor="animal">
                    Animal
                    <select
                        id="animal"
                        name="animal"
                        onChange={(e) => {
                            setAnimal(e.target.value)
                        }}
                        value={animal}
                    >
                        {ANIMALS.map((animal) => (
                            <option key={animal}>{animal}</option>
                        ))}
                    </select>
                </label>
                <label htmlFor="breed">
                    Breed
                    <select
                        id="breed"
                        name="breed"
                        disabled={breeds.length === 0}
                    >
                        {breeds.map((breed) => (
                            <option key={breed}>{breed}</option>
                        ))}
                    </select>
                </label>
                <button>Submit</button>
            </form>
            <Results
                data={results?.data ?? {}}
                dataKey="pets"
                component={Pet}
            />
        </div>
    )
}

export default SearchParams
