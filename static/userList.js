function makeList(props){
    console.log(props)
    ReactDOM.render(<List info={props}/>, document.getElementById("list"));}
 function List(props){
    console.log(props.info)
    const users= props.info.map((user) =>
        <tr key={user["rowid"]} id={"User_"+user["rowid"]}>
        <td>{user["name"]}</td>
        <td>{user["dob"]}</td>
        <td>{user["email"]}</td>
        <td>{user["phone"]}</td>
        </tr>);
        return(<table>
     <thead><tr><td>Name</td><td>Date of birth</td><td>Email</td><td>Phone</td></tr></thead>
       <tbody>{users}</tbody>
     </table>)

 }
 renderApp()