const Notification = ({msg}) => {
    if (msg === null) {
        return null;
    }
    return (
        <div className='err'>
            {msg}
        </div>
    )
}

export default Notification