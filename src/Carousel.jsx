import { useState } from 'react'

const Carousel = (props) => {
    const [active, setActive] = useState(0)
    const { images = ['http://pets-images.dev-apis.com/pets/none.jpg'] } = props
    const handleClick = (e) => {
        setActive(+e.target.dataset.index)
    }
    return (
        <div className="carousel">
            <img src={images[active]} alt="animal hero" />
            <div className="carousel-smaller">
                {images.map((photo, index) => (
                    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions
                    <img
                        onClick={handleClick}
                        data-index={index}
                        key={photo}
                        src={photo}
                        className={index === active ? 'active' : ''}
                        alt="animal thumbnail"
                    />
                ))}
            </div>
        </div>
    )
}

export default Carousel
