const Footer = ({footerName}) => {
    const footerStyle = {
        color: 'green',
        fontStyle: 'italic',
        fontSize: 16
    }
    return (
        <div style={footerStyle}>
            <br/>
            <em> {footerName} app, Department of Computer Science, University of Helsinki 2022</em>
        </div>
    )
}

export default Footer