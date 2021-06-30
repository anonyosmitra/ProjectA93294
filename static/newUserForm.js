var errors=[false,false,false,false]
function makeForm(){
 ReactDOM.render(<Form />, document.getElementById("formBox"));}

class Form extends React.Component {
    render() {
    return(
		<form id="newUserForm" action={window.location.href} method="post">
		<Name /><br></br>
		<Dob /><br></br>
		<Phone /><br></br>
		<Email /><br></br>
		<input type="button" value="Submit" onclick={onSubmit}></input>
		</form>
	)}
	onSubmit(){
	if(val(errors.join('+'))==0)
	    document.getElementById("newUserForm").submit();
	else
	    alert("Invalid information in form")
	}
	}
class Name extends React.Component {
        onChange(){
            var name=event.target.value;
            var hide=true
            for(var i in name)
                if (!(/[a-zA-Z]/).test(name[i]))
                    hide=false;
            document.getElementById("nameWarning").hidden=hide;
            errors[0]=hide
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
            if(now.getFullYear()<b[0]+18)
                {
                hide=false}
            else{
            if(now.getFullYear()==b[0]+18)
                if (now.getMonth()+1<b[1])
                {
                    hide=false}
                else {
                if (now.getMonth()+1==b[1]){
                     if (now.getDate()<b[2]){
                        hide=false}}}}
            document.getElementById("dobWarning").hidden=hide;
            errors[1]=hide
        }
        render() {
          return (<div><b>Date of Birth:</b>
          <input onChange={this.onChange} name="dob" type="date"></input>
          <span id="dobWarning" style={{color:"red",cursor: "default"}} hidden>
            <abbr title="User must be above 18!">&#9888;</abbr>
          </span></div>)
        }
      }
const countryCodes=[
{"uid":"IN","flag":"🇮🇳","code":"91"},
{"uid":"AD","flag":"🇦🇩","code":"376"},
{"uid":"AE","flag":"🇦🇪","code":"971"},
{"uid":"AF","flag":"🇦🇫","code":"93"},
{"uid":"AI","flag":"🇦🇮","code":"1264"},
{"uid":"AL","flag":"🇦🇱","code":"355"},
{"uid":"AM","flag":"🇦🇲","code":"374"},
{"uid":"AO","flag":"🇦🇴","code":"244"},
{"uid":"AR","flag":"🇦🇷","code":"54"},
{"uid":"AS","flag":"🇦🇸","code":"1684"},
{"uid":"AT","flag":"🇦🇹","code":"43"},
{"uid":"AU","flag":"🇦🇺","code":"61"},
{"uid":"AW","flag":"🇦🇼","code":"297"},
{"uid":"AZ","flag":"🇦🇿","code":"994"},
{"uid":"BB","flag":"🇧🇧","code":"1246"},
{"uid":"BD","flag":"🇧🇩","code":"880"},
{"uid":"BE","flag":"🇧🇪","code":"32"},
{"uid":"BF","flag":"🇧🇫","code":"226"},
{"uid":"BG","flag":"🇧🇬","code":"359"},
{"uid":"BH","flag":"🇧🇭","code":"973"},
{"uid":"BI","flag":"🇧🇮","code":"257"},
{"uid":"BJ","flag":"🇧🇯","code":"229"},
{"uid":"BM","flag":"🇧🇲","code":"1441"},
{"uid":"BN","flag":"🇧🇳","code":"673"},
{"uid":"BO","flag":"🇧🇴","code":"591"},
{"uid":"BR","flag":"🇧🇷","code":"55"},
{"uid":"BT","flag":"🇧🇹","code":"975"},
{"uid":"BW","flag":"🇧🇼","code":"267"},
{"uid":"BY","flag":"🇧🇾","code":"375"},
{"uid":"BZ","flag":"🇧🇿","code":"501"},
{"uid":"CA","flag":"🇨🇦","code":"1"},
{"uid":"CF","flag":"🇨🇫","code":"236"},
{"uid":"CH","flag":"🇨🇭","code":"41"},
{"uid":"CK","flag":"🇨🇰","code":"682"},
{"uid":"CL","flag":"🇨🇱","code":"56"},
{"uid":"CM","flag":"🇨🇲","code":"237"},
{"uid":"CN","flag":"🇨🇳","code":"86"},
{"uid":"CO","flag":"🇨🇴","code":"57"},
{"uid":"CR","flag":"🇨🇷","code":"506"},
{"uid":"CU","flag":"🇨🇺","code":"53"},
{"uid":"CV","flag":"🇨🇻","code":"238"},
{"uid":"CW","flag":"🇨🇼","code":"599"},
{"uid":"CY","flag":"🇨🇾","code":"357"},
{"uid":"DE","flag":"🇩🇪","code":"49"},
{"uid":"DJ","flag":"🇩🇯","code":"253"},
{"uid":"DK","flag":"🇩🇰","code":"45"},
{"uid":"DM","flag":"🇩🇲","code":"1767"},
{"uid":"DO","flag":"🇩🇴","code":"1809"},
{"uid":"DZ","flag":"🇩🇿","code":"213"},
{"uid":"EC","flag":"🇪🇨","code":"593"},
{"uid":"EE","flag":"🇪🇪","code":"372"},
{"uid":"EG","flag":"🇪🇬","code":"20"},
{"uid":"EH","flag":"🇪🇭","code":"212"},
{"uid":"ER","flag":"🇪🇷","code":"291"},
{"uid":"ES","flag":"🇪🇸","code":"34"},
{"uid":"ET","flag":"🇪🇹","code":"251"},
{"uid":"FI","flag":"🇫🇮","code":"358"},
{"uid":"FJ","flag":"🇫🇯","code":"679"},
{"uid":"FK","flag":"🇫🇰","code":"500"},
{"uid":"FO","flag":"🇫🇴","code":"298"},
{"uid":"FR","flag":"🇫🇷","code":"33"},
{"uid":"GA","flag":"🇬🇦","code":"241"},
{"uid":"GB","flag":"🇬🇧","code":"44"},
{"uid":"GD","flag":"🇬🇩","code":"1473"},
{"uid":"GE","flag":"🇬🇪","code":"995"},
{"uid":"GF","flag":"🇬🇫","code":"594"},
{"uid":"GG","flag":"🇬🇬","code":"44"},
{"uid":"GH","flag":"🇬🇭","code":"233"},
{"uid":"GI","flag":"🇬🇮","code":"350"},
{"uid":"GL","flag":"🇬🇱","code":"299"},
{"uid":"GN","flag":"🇬🇳","code":"224"},
{"uid":"GP","flag":"🇬🇵","code":"590"},
{"uid":"GQ","flag":"🇬🇶","code":"240"},
{"uid":"GR","flag":"🇬🇷","code":"30"},
{"uid":"GT","flag":"🇬🇹","code":"502"},
{"uid":"GU","flag":"🇬🇺","code":"1671"},
{"uid":"GW","flag":"🇬🇼","code":"245"},
{"uid":"GY","flag":"🇬🇾","code":"592"},
{"uid":"HN","flag":"🇭🇳","code":"504"},
{"uid":"HR","flag":"🇭🇷","code":"385"},
{"uid":"HT","flag":"🇭🇹","code":"509"},
{"uid":"HU","flag":"🇭🇺","code":"36"},
{"uid":"ID","flag":"🇮🇩","code":"62"},
{"uid":"IE","flag":"🇮🇪","code":"353"},
{"uid":"IL","flag":"🇮🇱","code":"972"},
{"uid":"IO","flag":"🇮🇴","code":"246"},
{"uid":"IQ","flag":"🇮🇶","code":"964"},
{"uid":"IR","flag":"🇮🇷","code":"98"},
{"uid":"IS","flag":"🇮🇸","code":"354"},
{"uid":"IT","flag":"🇮🇹","code":"39"},
{"uid":"JE","flag":"🇯🇪","code":"44"},
{"uid":"JM","flag":"🇯🇲","code":"1876"},
{"uid":"JO","flag":"🇯🇴","code":"962"},
{"uid":"JP","flag":"🇯🇵","code":"81"},
{"uid":"KE","flag":"🇰🇪","code":"254"},
{"uid":"KG","flag":"🇰🇬","code":"996"},
{"uid":"KH","flag":"🇰🇭","code":"855"},
{"uid":"KI","flag":"🇰🇮","code":"686"},
{"uid":"KM","flag":"🇰🇲","code":"269"},
{"uid":"KP","flag":"🇰🇵","code":"850"},
{"uid":"KR","flag":"🇰🇷","code":"82"},
{"uid":"KW","flag":"🇰🇼","code":"965"},
{"uid":"KY","flag":"🇰🇾","code":"1345"},
{"uid":"KZ","flag":"🇰🇿","code":"7"},
{"uid":"LA","flag":"🇱🇦","code":"856"},
{"uid":"LB","flag":"🇱🇧","code":"961"},
{"uid":"LI","flag":"🇱🇮","code":"423"},
{"uid":"LK","flag":"🇱🇰","code":"94"},
{"uid":"LR","flag":"🇱🇷","code":"231"},
{"uid":"LS","flag":"🇱🇸","code":"266"},
{"uid":"LT","flag":"🇱🇹","code":"370"},
{"uid":"LU","flag":"🇱🇺","code":"352"},
{"uid":"LV","flag":"🇱🇻","code":"371"},
{"uid":"LY","flag":"🇱🇾","code":"218"},
{"uid":"MA","flag":"🇲🇦","code":"212"},
{"uid":"MC","flag":"🇲🇨","code":"377"},
{"uid":"MD","flag":"🇲🇩","code":"373"},
{"uid":"ME","flag":"🇲🇪","code":"382"},
{"uid":"MG","flag":"🇲🇬","code":"261"},
{"uid":"MH","flag":"🇲🇭","code":"692"},
{"uid":"MK","flag":"🇲🇰","code":"389"},
{"uid":"ML","flag":"🇲🇱","code":"223"},
{"uid":"MN","flag":"🇲🇳","code":"976"},
{"uid":"MP","flag":"🇲🇵","code":"1670"},
{"uid":"MQ","flag":"🇲🇶","code":"596"},
{"uid":"MR","flag":"🇲🇷","code":"222"},
{"uid":"MS","flag":"🇲🇸","code":"1664"},
{"uid":"MT","flag":"🇲🇹","code":"356"},
{"uid":"MU","flag":"🇲🇺","code":"230"},
{"uid":"MV","flag":"🇲🇻","code":"960"},
{"uid":"MW","flag":"🇲🇼","code":"265"},
{"uid":"MX","flag":"🇲🇽","code":"52"},
{"uid":"MY","flag":"🇲🇾","code":"60"},
{"uid":"MZ","flag":"🇲🇿","code":"258"},
{"uid":"NA","flag":"🇳🇦","code":"264"},
{"uid":"NC","flag":"🇳🇨","code":"687"},
{"uid":"NE","flag":"🇳🇪","code":"227"},
{"uid":"NF","flag":"🇳🇫","code":"672"},
{"uid":"NG","flag":"🇳🇬","code":"234"},
{"uid":"NI","flag":"🇳🇮","code":"505"},
{"uid":"NL","flag":"🇳🇱","code":"31"},
{"uid":"NO","flag":"🇳🇴","code":"47"},
{"uid":"NP","flag":"🇳🇵","code":"977"},
{"uid":"NR","flag":"🇳🇷","code":"674"},
{"uid":"NU","flag":"🇳🇺","code":"683"},
{"uid":"NZ","flag":"🇳🇿","code":"64"},
{"uid":"OM","flag":"🇴🇲","code":"968"},
{"uid":"PA","flag":"🇵🇦","code":"507"},
{"uid":"PE","flag":"🇵🇪","code":"51"},
{"uid":"PF","flag":"🇵🇫","code":"689"},
{"uid":"PG","flag":"🇵🇬","code":"675"},
{"uid":"PH","flag":"🇵🇭","code":"63"},
{"uid":"PK","flag":"🇵🇰","code":"92"},
{"uid":"PL","flag":"🇵🇱","code":"48"},
{"uid":"PR","flag":"🇵🇷","code":"1"},
{"uid":"PT","flag":"🇵🇹","code":"351"},
{"uid":"PW","flag":"🇵🇼","code":"680"},
{"uid":"PY","flag":"🇵🇾","code":"595"},
{"uid":"QA","flag":"🇶🇦","code":"974"},
{"uid":"RE","flag":"🇷🇪","code":"262"},
{"uid":"RO","flag":"🇷🇴","code":"40"},
{"uid":"RS","flag":"🇷🇸","code":"381"},
{"uid":"RU","flag":"🇷🇺","code":"7"},
{"uid":"RW","flag":"🇷🇼","code":"250"},
{"uid":"SA","flag":"🇸🇦","code":"966"},
{"uid":"SB","flag":"🇸🇧","code":"677"},
{"uid":"SC","flag":"🇸🇨","code":"248"},
{"uid":"SD","flag":"🇸🇩","code":"249"},
{"uid":"SE","flag":"🇸🇪","code":"46"},
{"uid":"SG","flag":"🇸🇬","code":"65"},
{"uid":"SI","flag":"🇸🇮","code":"386"},
{"uid":"SK","flag":"🇸🇰","code":"421"},
{"uid":"SL","flag":"🇸🇱","code":"232"},
{"uid":"SM","flag":"🇸🇲","code":"378"},
{"uid":"SN","flag":"🇸🇳","code":"221"},
{"uid":"SO","flag":"🇸🇴","code":"252"},
{"uid":"SR","flag":"🇸🇷","code":"597"},
{"uid":"SS","flag":"🇸🇸","code":"211"},
{"uid":"SV","flag":"🇸🇻","code":"503"},
{"uid":"SX","flag":"🇸🇽","code":"599"},
{"uid":"SY","flag":"🇸🇾","code":"963"},
{"uid":"SZ","flag":"🇸🇿","code":"268"},
{"uid":"TD","flag":"🇹🇩","code":"235"},
{"uid":"TG","flag":"🇹🇬","code":"228"},
{"uid":"TH","flag":"🇹🇭","code":"66"},
{"uid":"TJ","flag":"🇹🇯","code":"992"},
{"uid":"TK","flag":"🇹🇰","code":"690"},
{"uid":"TL","flag":"🇹🇱","code":"670"},
{"uid":"TM","flag":"🇹🇲","code":"993"},
{"uid":"TN","flag":"🇹🇳","code":"216"},
{"uid":"TO","flag":"🇹🇴","code":"676"},
{"uid":"TR","flag":"🇹🇷","code":"90"},
{"uid":"TV","flag":"🇹🇻","code":"688"},
{"uid":"TW","flag":"🇹🇼","code":"886"},
{"uid":"TZ","flag":"🇹🇿","code":"255"},
{"uid":"UA","flag":"🇺🇦","code":"380"},
{"uid":"UG","flag":"🇺🇬","code":"256"},
{"uid":"US","flag":"🇺🇸","code":"1"},
{"uid":"UY","flag":"🇺🇾","code":"598"},
{"uid":"UZ","flag":"🇺🇿","code":"998"},
{"uid":"VA","flag":"🇻🇦","code":"39"},
{"uid":"VE","flag":"🇻🇪","code":"58"},
{"uid":"VG","flag":"🇻🇬","code":"1284"},
{"uid":"VN","flag":"🇻🇳","code":"84"},
{"uid":"VU","flag":"🇻🇺","code":"678"},
{"uid":"WS","flag":"🇼🇸","code":"685"},
{"uid":"XK","flag":"🇽🇰","code":"381"},
{"uid":"YE","flag":"🇾🇪","code":"967"},
{"uid":"YT","flag":"🇾🇹","code":"262"},
{"uid":"ZA","flag":"🇿🇦","code":"27"},
{"uid":"ZM","flag":"🇿🇲","code":"260"},
{"uid":"ZW","flag":"🇿🇼","code":"263"}]
class Phone extends React.Component {
        onChange(){
            var num=event.target.value;
            var hide=!Number.isNaN(num)
            document.getElementById("numWarning").hidden=hide;
            errors[2]=hide
        }
        selCountry(){
        contCode=document.getElementById("country").value;

        }
        render() {
          const countries= countryCodes.map((country) =>
        <option value={country.code}>{country.flag}  +{country.code}</option>
    );
          return (<div><b>Date of Birth:</b>
          <select onChange={this.selCountry}  name="tel_code" id="country">{countries}</select><input onChange={this.onChange} name="num"></input>
          <span id="numWarning" style={{color:"red",cursor: "default"}} hidden>
            <abbr title="Number must be digits!">&#9888;</abbr>
          </span></div>)
        }
      }
class Email extends React.Component {
        onChange(){
            var mail=event.target.value;
            var hide=true
            mail=mail.split("@")
            if(mail.length!=2)
                hide=false
            else{
                if(mail[1].split(".").length<2)
                hide=false
                else
                {
                validChars=["+","-","_","~","."]
                mail=mail[0]+mail[1]
                for(var i in mail)
                    if (!(/[a-zA-Z0-9]/).test(mail[i])&&!(validChars.includes(mail[i])))
                    hide=false;
                }
            }
            document.getElementById("emailWarning").hidden=hide;
            errors[3]=hide
        }
        render() {
          return (<div><b>Date of Birth:</b>
          <input onChange={this.onChange} name="email" ></input>
          <span id="emailWarning" style={{color:"red",cursor: "default"}} hidden>
            <abbr title="Email Syntax Invalid!">&#9888;</abbr>
          </span></div>)
        }
      }
makeForm();