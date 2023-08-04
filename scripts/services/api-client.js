// HTTP/HTTPS call
// For async we Call + Forget(Callback function) a function
import URL from '../utils/constant.js'

async function makeNetworkCall() {
    try{
        const response = await fetch(URL); // Block
        // console.log("Response", response)
        const object = await response.json(); // Block
        // console.log('JSON', object)
        return object; // Wrap Promise
    }
    catch(err){
        console.log('Some problem in API call ', err);
        throw err; 
    }
}

makeNetworkCall();
export default makeNetworkCall;

// function makeNetworkCall() {
    // const promise =fetch(URL);//Assign to thread
    // // const promise= await fetch("https://gist.githubusercontent.com/kshirsagarps/36fade16fa39202715656ef487aaf7b0/raw/2b682e589ef283f06be42d2799dfa54f57794a6e/Pizza.json");
    // console.log("Promise is", promise)
    // promise.then(response => {
    //     console.log("Response is ", response);
    //     const promise2 = response.json()//Deserialization (JSON)
    //     promise2.then(data => console.log('Data is ', data)).catch(e => console.log('JSON parse Error', e))
    // }).catch(err => {
    //     console.log('Error is', err)
    // });
// }
// makeNetworkCall()