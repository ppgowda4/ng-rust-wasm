extern crate rand;

use std::ffi::CString;
use std::mem;
use std::os::raw::{c_char, c_void};

#[no_mangle]
pub extern fn alloc(size: usize) -> *mut c_void {
    let mut buf = Vec::with_capacity(size);
    let ptr = buf.as_mut_ptr();
    mem::forget(buf);
    return ptr as *mut c_void;
}

#[no_mangle]
pub extern fn dealloc_str(ptr: *mut c_char) {
    unsafe {
        let _ = CString::from_raw(ptr);
    }
}

#[no_mangle]
pub extern fn factorial(n: u32) -> u128 {
    let mut n = n as u128;
    let mut result = 1;
    while n > 0 {
        result = result * n;
        n = n - 1;
    }
    result
}

#[no_mangle]
pub extern fn factorial_number_str(n: u32) -> *mut c_char {
    let res = factorial(n);
    let s = format!("{}", res);
    let result = CString::new(s).unwrap();
    result.into_raw()
}

#[no_mangle]
pub extern fn febonacci_number(n: u128) -> u128 {
    if n <= 1 {
        return n;
    }

    febonacci_number(n-1) + febonacci_number(n-2)
}

#[no_mangle]
pub extern fn febonacci_number_str(n: u32) -> *mut c_char {
    let res = febonacci_number(n as u128);
    let s = format!("{}", res);
    let result = CString::new(s).unwrap();
    result.into_raw()
}


#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_factorial() {
        let val = factorial(5);
        assert_eq!(val, 120);
    }

    #[test]
    fn test_factorial_2() {
        let val = factorial(19);
        assert_eq!(val, 121645100408832000);
    }

    #[test]
    fn test_factorial_3() {
        let val = factorial(21);
        assert_eq!(val, 51090942171709440000);
    }


    #[test]
    fn test_fibonacci() {
        let val = febonacci_number(9);
        assert_eq!(val, 34);
    }

    #[test]
    fn test_fibonacci_2() {
        let val = febonacci_number(10);
        assert_eq!(val, 55);
    }

    #[test]
    fn test_fibonacci_3() {
        let val = febonacci_number(44);
        assert_eq!(val, 701408733);
    }
}