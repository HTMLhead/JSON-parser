const Analyze = require('../script/analyze')
const ErrorCheck = require('../script/errorCheck.js')
const Tokenize = require('../script/tokenize')
const JSONData = require('../script/jsonData')
const errorCheck = new ErrorCheck
const analyze = new Analyze([], errorCheck)
const tokenize = new Tokenize

const checkObj = {
    value: null,

    toBe(value) {
        if (value === this.value) {
            return 'OK'
        } else {
            return `FAIL (나온 값 : ${value}, 나와야하는 값 : ${this.value})`
        }
    }
}

function expect(value) {
    checkObj.value = value
    return checkObj
}

function test(message, method) {
    console.log(`${message} : ${method()}`)
}

test('객체의 key데이터인지 확인한다.', function() {
    const data = "hellow:"
    const result = analyze.isObjectKey(data)
    return expect(true).toBe(result)
})

test('데이터가 boolean타입인지 확인한다', function() {
    const data = "true"
    const result = analyze.isBoolean(data)
    return expect(true).toBe(result)
})

test('데이터가 문자열인지 확인한다.', function() {
    const data = "'test1'"
    const result = analyze.isString(data)
    return expect(true).toBe(result)
})

test('주어진 데이터queue배열이 끝날때까지 체크하며 배열이라면 배열 타입의child를 만들어 준다.', function() {
    const data = ['[']
    const result = analyze.getChild(data)[0].type
    return expect('Array').toBe(result)
})

test('주어진 데이터queue배열이 끝날때까지 체크하며 객체라면 객체 타입의 child를 만들어 준다.', function() {
    const data = ['{']
    const result = analyze.getChild(data)[0].type
    return expect('Object').toBe(result) 
})

test('주어진 데이터queue배열이 끝날때까지 체크하며 값이 객체의 키값인지 확인한후 키값을 value로 만들어 준다.', function() {
    const data = ['a:']
    const result = analyze.getChild(data)[0].value
    return expect('a').toBe(result) 
})

test('주어진 데이터queue배열이 끝날때까지 체크하며 배열이나 객체가 끝나는 괄호가 나온다면 반복문을 끝내고 배열을 반환해준다.', function() {
    const data = ['}']
    const result = analyze.getChild(data)[0]
    return expect(undefined).toBe(result) 
})

test('주어진 데이터queue배열이 끝날때까지 체크하며 boolean이라면 boolean타입의 child를 만들어 준다', function() {
    const data = ['true']
    const result = analyze.getChild(data)[0].type
    return expect('Boolean').toBe(result) 
})

test('주어진 데이터queue배열이 끝날때까지 체크하며 null 이라면 null타입의 child를 만들어 준다.', function() {
    const data = ['null']
    const result = analyze.getChild(data)[0].type
    return expect('Null').toBe(result) 
})

test('주어진 데이터queue배열이 끝날때까지 체크하며 String이라면 string타입의 child를 만들어 준다', function() {
    const data = ["'string'"]
    const result = analyze.getChild(data)[0].type
    
    return expect('String').toBe(result) 
})

test('주어진 데이터queue배열이 끝날때까지 체크하며 Number라면 Number타입의 child를 반환해 준다.', function() {
    const data = ['11']
    const result = analyze.getChild(data)[0].type
    return expect('Number').toBe(result) 
})