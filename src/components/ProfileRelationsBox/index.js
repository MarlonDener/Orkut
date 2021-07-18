
const ProfileRelationsBox = (props) => {
    return (

        <>
            <h2 className="smallTitle">
                {props.title} ({props.items.length})
            </h2>
            <ul>
                {props.items.map((people, index) => {
                    return (
                        <li key={index}>
                            <a href={`/users/${people}`}>
                                <img src={`https://github.com/${people}.png`} />
                                <span>{people}</span>
                            </a>
                        </li>
                    )
                })}
            </ul>
        </>
    );
}

export default ProfileRelationsBox