// Assignment Code
var generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;

}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);

function generatePassword(){

  //Decisions are placed into an array to keep multiple vars from being made
  //In order: Length, lowercase, uppercase, numeric, special
  var decide = [10, true, true, true, true];

  //Prompt for length
  decide[0] = window.prompt("Number of characters?\n(whole number from 8-128; empty prompt will default to 10)");
  if (decide[0] == ""){decide[0] = 10;}

  //Edge cases (null, integer, range)
  if (decide[0] == null){window.alert("Process cancelled"); return "Cancelled";}
  if (!Number.isInteger(+decide[0])){window.alert("Input is not an Integer"); return "Cancelled";}
  if (decide[0] > 128 || decide[0] < 8){window.alert("Boundaries for number exceed or subceed range"); return "Cancelled";}

  //Other customization options
  decide[1] = window.confirm("Do you want lowercases in your password?\n(Confirm = yes; Cancel = no)")
  decide[2] = window.confirm("Do you want uppercases in your password?\n(Confirm = yes; Cancel = no)")
  decide[3] = window.confirm("Do you want numbers in your password?\n(Confirm = yes; Cancel = no)")
  decide[4] = window.confirm("Do you want special characters in your password?\n(Confirm = yes; Cancel = no)")

  //Edge case
  if (!decide[1] && !decide[2] && !decide[3] && !decide[4]){window.alert("Password contains nothing"); return "Cancelled";}

  //requi will later check if the password created meets requirements
  var requi = false

  //while loop for creating password
  //looped for the tiny case that characters overwrite other important characters
  while (!requi){

    //password variable instantiation
    var pass = ""

    //base will store what was used as a base
    //0=none ; 1=lowercase ; 2=uppercase ; 3=numbers ; 4=special charcaters
    var base = 0;
    if (decide[1]){base=1;}
    else if (decide[2]){base=2;}
    else if (decide[3]){base=3;}
    else {base=4}


    //creating base of the password
    for (i = 0; i < decide[0]; i++){
      switch(base){
        case 1:
          pass += randLett(false); 
          break;
        case 2:
          pass += randLett(true);
          break;
        case 3:
          pass += randNums();
          break;
        case 4:
          pass += randSpecial();
          break;
      }
    }

    //replacing characters based on averages within password making
    //we do not have to do lower case since if that is true, it will always be the base

    //about half or less of the password will be converted to uppercase
    if (decide[2] && base != 2){
      for (i = 0; i < Math.floor(decide[0]/2); i++){
        var rand = Math.floor(Math.random() * decide[0]);
        pass = pass.substring(0, rand) + randLett(true) + pass.substring(rand + 1);
      }
    }

    //about one third or less will be replaced with numbers
    if (decide[3] && base != 3){
      for (i = 0; i < Math.floor(decide[0]/3); i++){
        var rand = Math.floor(Math.random() * decide[0]);
        pass = pass.substring(0, rand) + randNums(true) + pass.substring(rand + 1);
      }
    }

    //about one fourth or less will be replaced with special chars
    if (decide[4] && base != 4){
      for (i = 0; i < Math.floor(decide[0]/4); i++){
        var rand = Math.floor(Math.random() * decide[0]);
        pass = pass.substring(0, rand) + randSpecial() + pass.substring(rand + 1);
      }
    }

    //checking if requirements are met, if not, repeat above
    requi = check(pass, decide[1], decide[2], decide[3], decide[4]);
  }

  return pass;
}

function randLett(Upp){
  //possibilities of letters
  var possibility = "abcdefghijklmnopqrstuvwxyz";

  //random letter from possibility
  var lett = possibility.charAt(Math.floor(Math.random() * 26));

  //switching to uppercase if needed
  if (Upp){lett = lett.toUpperCase();}

  return lett;
}

function randNums(){
  //could've been done in one line, but wanted to keep consistancy
  var num = Math.floor(Math.random() * 10);

  return num;
}

function randSpecial(){
  //possibilities of chars, tried to keep simple sice formatting gets weird with all
  var possibility = " !#$%&()*+-:;=?@[]^_|~{}";

  //random char from possibility
  var spe = possibility.charAt(Math.floor(Math.random() * 24));

  return spe;
}

function check(password, checkLower, checkUpper, checkNums, checkSpecial){
  //check keeps track of each check in an array
  //in order: Lowercases, Uppercases, Nums, Specials
  var checks = [false, false, false, false]

  //regex test method "array" of specials
  var special = /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/g;
  
  //lowercase check
  if (checkLower){
    for (i = 0; i < password.length; i++){
      if (isNaN(password.charAt(i)) && !special.test(password.charAt(i)) && password.charAt(i) == password.charAt(i).toLowerCase()){
        checks[0] = true;
        break;
      }
    }
  }
  else{checks[0] = true;}

  //uppercase check
  if (checkUpper){
    for (i = 0; i < password.length; i++){
      if (isNaN(password.charAt(i)) && !special.test(password.charAt(i)) && password.charAt(i) == password.charAt(i).toUpperCase()){
        checks[1] = true;
        break;
      }
    }
  }
  else{checks[1] = true;}

  //number check
  if (checkNums){
    for (i = 0; i < password.length; i++){
      if (!isNaN(password.charAt(i)) && !special.test(password.charAt(i))){
        checks[2] = true;
        break;
      }
    }
  }
  else{checks[2] = true;}

  //special check
  if (special.test(password) || !checkSpecial){
    checks[3] = true;
  }
  
  //returning based on checks
  if (checks[0] && checks[1] && checks[2] && checks[3]){
    return true;
  }
  else{
    return false;
  }
}