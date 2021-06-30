function makeList(props){
    ReactDOM.render(<list info={props}/>, document.getElementById("formBox"));}
 function List(props){
    const users= props.info.map((user) =>
        (<div key={user["rowid"]}><tr><td>{user["name"]}</td><td>{user["dob"]}</td><td>{user["email"]}</td><td>{user["phone"]}</td></tr></div>)
     return (<div>
     <tr><td>Name</td><td>Date of birth</td><td>Email</td><td>Phone</td></tr>
       {users}
     </div>)

 }