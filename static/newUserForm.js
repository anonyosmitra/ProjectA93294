function makeForm(){
 ReactDOM.render(<Form />, document.getElementById("formBox"));}
function Form(){
    return(
		<form>
		<Name /><br></br>
		<Dob /><br></br>
		</form>
	)}
class Name extends React.Component {
        onChange(){
            var name=event.target.value;
            var hide=true
            for(var i in name)
                if (!(/[a-zA-Z]/).test(name[i]))
                    hide=false;
            document.getElementById("nameWarning").hidden=hide;
        }
        render() {
          return (<div><b>Name:</b>
          <input onBlur={this.onChange} name="name"></input>
          <span id="nameWarning" style={{color:"red",cursor: "default"}} hidden>
            <abbr title="Invalid Name">&#9888;</abbr>
          </span></div>)
        }
      }
class Dob extends React.Component {
        onChange(){
            var dob=event.target.value;
            var hide=true
            var b=dob.split("-")
            for(var i in b)
                b[i]=parseInt(b[i])
            var now=new Date()
            if(now.getFullYear<b[0]+18)
                hide=false
            else if(now.getFullYear==b[0]+18)
                if (now.getMonth+1<b[1])
                    hide=false
                else if (now.getMonth+1==b[1])
                     if (now.getDate<b[2])
                        hide=false
            document.getElementById("dobWarning").hidden=hide;
        }
        render() {
          return (<div><b>Date of Birth:</b>
          <input onBlur={this.onChange} name="dob" type="date"></input>
          <span id="dobWarning" style={{color:"red",cursor: "default"}} hidden>
            <abbr title="User must be about 18!">&#9888;</abbr>
          </span></div>)
        }
      }
makeForm();