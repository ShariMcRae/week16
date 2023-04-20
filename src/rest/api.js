// Provides CRUD methods for accessing the
// data located at MockApi.com.

export async function getRecords(searchBy, query, endpoint, sortBy, sortOrder) {
  try {
    const url = new URL(endpoint);
    if (query)
      url.searchParams.append(searchBy, query);
    if (sortBy)
      url.searchParams.append('sortBy', sortBy);
    if (sortOrder)
      url.searchParams.append('order', sortOrder ? sortOrder : "");
    const resp = await fetch(url);
  console.log("resp", resp);
    const records = await resp.json();
  console.log("records", records);
    if (records === 'Not found') return [];
    else return records;
  } catch (e) {
    const msg = "Error occurred in getRecords method: " + 
        JSON.stringify(e) + JSON.stringify({query, endpoint, sortBy, sortOrder});
    console.log(msg, e);
    throw new Error(msg);
  }
}

export async function createRecord(endpoint, newRecord) {
  try { 
    const resp = await fetch(`${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newRecord),
    });
    return await resp.json();
  } catch (e) {
    const msg = "Error occurred in createRecord method.";
    console.log(msg, e);
    throw new Error(msg);
  }
}

export async function getRecord(endpoint, id) {
  try {
    const url = new URL(endpoint);
    url.searchParams.append("id", id ? id : "0");
    const resp = await fetch(url);
console.log("resp", resp);
    
    const data = await resp.json();
    return data ? data[0] ?? null : {};
  } catch (e) {
    const msg = "Error occurred in getRecord method.";
    console.log(msg, e);
    throw new Error(msg);
  }
}

export async function updateRecord(endpoint, id, updatedRecord) {
console.log("updateRecord, updatedRecord", updatedRecord);
console.log("updateRecord, id", id);
  try {
    const resp = await fetch(`${endpoint}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedRecord),
    });
    return await resp.json();
  } catch (e) {
    const msg = "Error occurred in updateRecord method.";
    console.log(msg, e);
    throw new Error(msg);
  }
}

export async function deleteRecord(endpoint, id) {
  try {
    const resp = await fetch(`${endpoint}/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return await resp.json();
  } catch (e) {
    const msg = "Error occurred in deleteRecord method.";
    console.log(msg, e);
    throw new Error(msg);
  }
}
