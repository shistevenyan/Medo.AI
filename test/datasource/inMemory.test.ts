import inMemory from "../../src/backend/lib/datasources/inMemory";

let inMemData;

beforeEach(() => {
    inMemData = new inMemory();
});

test('COLLS Should be initialized as a empty object', () => {
    expect(inMemData.COLLS).toMatchObject({});
});

test('saveData method Should save into COLLS', () => {
    inMemData.saveData("patient", "larry", {"id":"larry" ,"name":"Larry", "ahcNum":"12345678"});
    expect(inMemData.COLLS).toMatchObject({"patient": { "larry": { "id": "larry", "name": "Larry", "ahcNum": "12345678" }}});
});

test('saveData method Should update data from COLLS if id exists', () => {
    inMemData.COLLS = {"patient": {"old-id": {"id": "old-id", "name": "old-name", "ahcNum": "old-num"}}};
    inMemData.saveData("patient", "old-id", { "id": "new-id", "name": "new-name", "ahcNum": "new-num" });
    expect(inMemData.COLLS).toMatchObject({ "patient": { "new-id": { "id": "new-id", "name": "new-name", "ahcNum": "new-num"}}});
});

test('saveData method Should insert new id to COLLS', () => {
    inMemData.COLLS = {"patient": { "id1": { "id": "id1", "name": "name1", "ahcNum": "num1" }}};
    inMemData.saveData("patient", "id2", { "id": "id2", "name": "name2", "ahcNum": "num2" });
    expect(inMemData.COLLS).toMatchObject({ 
        "patient": {
            "id1":{
                "id": "id1", 
                "name": "name1", 
                "ahcNum": "num1"
            },
            "id2": {
                "id": "id2", 
                "name": "name2", 
                "ahcNum": "num2"
            }
        }

    });
});