export function getObjectWithDate(item) {
	const dateOptions = {
		weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric'
	}
	const dateObj = item.date.toDate()
	item.date = dateObj.toLocaleDateString('es-CO', dateOptions)
	return item
}