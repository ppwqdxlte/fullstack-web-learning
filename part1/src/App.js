const Hello = (props) => {
	const bornYear = ()=>{
		const yearNow = new Date().getFullYear();
		return yearNow - props.age;
	}

	return (
		      <div>
		        <p>
		          Hello {props.name}, you are {props.age} years old
		        </p>
			<p>So you were probably born in {bornYear()}</p>
		      </div>
		    )
}

const Footer = () => {
	  return (
		      <div>
		        greeting app created by <a href="https://github.com/mluukkai">mluukkai</a>
		      </div>
		    )
}

const Counter = ({num})=>{
	return (
		<div>
			计数器:{num}
		</div>
	)
}

const App = (props) => {
	  const name = 'Peter'
	  const age = 100
	  const {counter} = props
	return (
		    <>
		      <h1>Greetings</h1>
		      <Hello name="Maya" age={26 + 10} />
		      <Hello name={name} age={age} />
			  <Counter num={counter} />
		      <Footer />
		    </>
		  )
}

export default App;