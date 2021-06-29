function makeForm(){
 ReactDOM.render(<Form />, document.getElementById("formBox"));}
function Form(){
    return(
		<div>
		<Name /><br></br>
		</div>
	)}
class Name extends React.Component {
       isName(name){
            for(var i in name)
                if (!(/[a-zA-Z]/).test(name[i]))
                    return(false)
            return(true)

        }
        onChange(){
            document.getElementById("nameWarning").hidden=this.isName(event.target.value);
        }
        render() {
          return (<div><b>Name:</b>
          <input onBlur={this.onChange} name="name"></input>
          <span id="nameWarning" style={{color:"red",cursor: "default"}} hidden>
            <abbr title="Invalid Name">&#9888;</abbr>
          </span></div>)
        }
      }
makeForm();