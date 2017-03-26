/**
 * Created by c5mluhta on 22.3.2017.
 */

export class UtilsClass {

  static createDate(value: string): Date {
    let year = value["dateBirth"].slice(0,4);
    let month = value["dateBirth"].slice(5,7);
    month-=1;
    var day = value["dateBirth"].slice(8,10);
    return new Date(year, month, day);
  }

  static validateDate(value: string): boolean {
    let re = new RegExp("^[0-9]{4}(-)[0-9]{2}(-)[0-9]{2}$");
    if (re.test(value)) {
      console.log("Valid");
      return true;
    } else {
      console.log("Invalid");
      return false;
    }
  }

  static validateEmail(value: string): boolean {
    let re = new RegExp("^[0-9a-zA-Z:\.]{3,30}\@[0-9a-zA-Z:\.]{3,30}\.[a-zA-z]{2,3}$");
    if (re.test(value)) {
      console.log("Valid");
      return true;
    } else {
      console.log("Invalid");
      return false;
    }
  }

  static validateEmailStart(value: string): boolean {
    let re = new RegExp("^[0-9a-zA-Z]{1}$");
    if (re.test(value)) {
      console.log("Valid");
      return true;
    } else {
      console.log("Invalid");
      return false;
    }
  }

  static validateShortOpenField(value: string): boolean {
    let re = new RegExp("^[0-9a-zA-ZåäöÅÄÖéÉ€ ]{2,50}$");
    if (re.test(value)) {
      console.log("Valid");
      return true;
    } else {
      console.log("Invalid");
      return false;
    }
  }

  static validateLongOpenField(value: string): boolean {
    let re = new RegExp("^[0-9a-zA-ZåäöÅÄÖéÉ€\.\n\, ]{2,64000}$");
    if (re.test(value)) {
      console.log("Valid");
      return true;
    } else {
      console.log("Invalid");
      return false;
    }
  }

  static validatePhoneNumber(value: string): boolean {
    let re = new RegExp("^[0-9\+]{8,13}$");
    if (re.test(value)) {
      console.log("Valid");
      return true;
    } else {
      console.log("Invalid");
      return false;
    }
  }
}
