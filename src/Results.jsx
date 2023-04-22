const Results = ({ data, dataKey, component: Component }) => {
    console.log(data, dataKey)
    const list = data[dataKey] ?? []
    return (
        <div className="search">
            {!list.length ? (
                <h1>No Items Found</h1>
            ) : (
                list.map((item) => {
                    return <Component key={item.id} {...item} />
                })
            )}
        </div>
    )
}

export default Results
