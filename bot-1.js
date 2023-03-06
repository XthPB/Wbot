const qrcode = require('qrcode-terminal');
const { Client, LocalAuth } = require('whatsapp-web.js');

//Read QRcode only one time
const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
      handleSIGINT: false,
      args: [
          '--no-sandbox',
          '--disable-setuid-sandbox'
      ] }
  });
 

client.on('qr', qr => {
    qrcode.generate(qr, {small: true});
});

client.on('ready', () => {
    console.log('Client is ready!');

    // Number and Text.
    var number = "+919855145900";
    var text = "WHATSAPP BOT TESTING";

    //Cleaning to only numbers
    number = number.replace(/\D/g, "");
    //console.log(number);

    if (Array.from(number)[0] == "9" && Array.from(number)[1] == "1" && number.length >10) {  
        number=number.substring(2);
        //console.log(number);
    } else {
        number=number;
        //console.log(number);
    }

    
    number="91"+number+"@c.us";
    
    var number_array = [number]
    number_array.forEach(element => console.log(element));

    // Sending message.
    function senf_numeber (number,text) {
        client.isRegisteredUser(number).then(function(isRegistered) {
            if(isRegistered) {
                console.log(number+' Registered');
                client.sendMessage(number, (text));
            }else{
                console.log(number+' Not registered');
            }
        })
    }  
    number_array.forEach(element => senf_numeber (element,text));
});


client.on('message', msg => {
    if (msg.body == 'Hi') {
        //msg.reply('Hi, You are now communicating with xthpb');
	  msg.delete();
    }
});

client.initialize();

//Closing correcily using CTRL+C 
process.on('SIGINT', async () => {
    console.log('(SIGINT) Shutting down...');
    await client.destroy();
    console.log('client destroyed');
    process.exit(0);
});
 

