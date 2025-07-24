export function pickerCallback(data) {
    if (data.action == google.picker.Action.PICKED) {
        let fileId = data.docs[0].id
    }
}