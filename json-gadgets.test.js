const {
  file,
  JsonFile,
  readFile,
  writeFile
}=require("./json-gadgets.js");

test('error while opening non-existing file', () => {
  expect(()=>file("inmagined-file.json")).toThrow();
})

test('read name parameter from package.json', () => {
  expect(file("./package.json").content.name).toBe("carnival-toolbox");
})

test('writing command in package.json', () => {
  var hook=file("./package.json",{
    space:2
  });
  wokspace=hook.content;
  wokspace.scripts.helloWorld="echo hello world";
  hook.content=wokspace;
  expect(file("./package.json").content.scripts.helloWorld).toBe("echo hello world");
})

afterAll(()=>{
  var context=file("./package.json").content;
  delete context.scripts.helloWorld;
  file("./package.json",{
    space:2
  }).content=context;
});
