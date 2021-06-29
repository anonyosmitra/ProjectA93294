function makeForm(){
 ReactDOM.render(<Form />, document.getElementById("formBox"));}
function Form(){
    return(
		<div>
		Name: <Name /><br></br>
		</div>
	)}
class Name extends React.Component {
        onChange(){
            name=this.setState({value: event.target.value});
            f=true
            for(i in name)
                if (!(/[a-zA-Z]/).test(name[i]))
                    f=false;
            document.getElementById("nameWarning").hidden=f;
        }
        render() {
          return (<div><b>Name:</b>
          <input onfocusout={this.onChange} name="name"></input>
          <span id="nameWarning"style="color:red;" hidden>
            <abbr title="Invalid Name">&#9888;</abbr>
          </span></div>)
        }
      }
makeForm();