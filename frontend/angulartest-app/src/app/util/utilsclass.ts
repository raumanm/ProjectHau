/**
 * Created by c5mluhta on 22.3.2017.
 */

export class UtilsClass {

  static createDateToBrowser(value: string): string {
    let date = new Date(value);
    let temp = date.getFullYear()+"-";

    if(date.getMonth() < 9) {
    temp += ('0' + (date.getMonth()+1).toString().slice(-2))+"-";
    } else {
      temp += (date.getMonth()+1).toString()+"-";
    }
    if(date.getDate() < 9) {
      temp += ('0' + date.getDate().toString().slice(-2));
    } else {
      temp += date.getDate().toString();
    }
    return temp;
  }

  static validatePairAmount(value: string): boolean {
    let re = new RegExp("^[1-9]{1}$");
    if (re.test(value)) {
      return true;
    } else {
      console.log("Invalid pair amount");
      return false;
    }
  }

  static validateZipCode(value: string): boolean {
    let re = new RegExp("^[0-9]{5}$");
    if (re.test(value)) {
      return true;
    } else {
      console.log("Invalid zipcode");
      return false;
    }
  }

   static createDate(value: string): Date {
    let year = +value.substring(0,4);
    let month = +value.substring(5,7);
    month=-1;
    let day = +value.substring(8,10);
    return new Date(year, month, day);
  }

  static validateDate(value: string): boolean {
    let re = new RegExp("^[0-9]{4}(-)[0-9]{2}(-)[0-9]{2}$");
    if (re.test(value)) {
      return true;
    } else {
      console.log("Invalid date");
      return false;
    }
  }

  static validateEmail(value: string): boolean {
    let re = new RegExp("^[0-9a-zA-Z:\.]{3,30}\@[0-9a-zA-Z:\.]{3,30}\.[a-zA-z]{2,3}$");
    if (re.test(value)) {
      return true;
    } else {
      console.log("Invalid email");
      return false;
    }
  }

  static validateEmailStart(value: string): boolean {
    let re = new RegExp("^[0-9a-zA-Z]{1}$");
    if (re.test(value)) {
      return true;
    } else {
      console.log("Invalid email start");
      return false;
    }
  }

  static validateShortOpenField(value: string): boolean {
    let re = new RegExp("^[0-9a-zA-ZåäöÅÄÖéÉ€' ]{2,50}$");
    if (re.test(value)) {
      return true;
    } else {
      console.log("Invalid shortopen field");
      return false;
    }
  }

  static validateLongOpenField(value: string): boolean {
    let re = new RegExp("^[0-9a-zA-ZåäöÅÄÖéÉ€'\.\n\, ]{2,64000}$");
    if (re.test(value)) {
      return true;
    } else {
      console.log("Invalid longopen field");
      return false;
    }
  }

  static validatePhoneNumber(value: string): boolean {
    let re = new RegExp("^[0-9\+]{8,13}$");
    if (re.test(value)) {
      return true;
    } else {
      console.log("Invalid phonenumber");
      return false;
    }
  }
}
