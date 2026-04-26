¿Por qué el estado de la lista de pokémon vive en App.tsx y no en PokemonList o PokemonCard?

Porque tanto PokemonList como PokemonCard necesitan acceder a esa información. Si el estado viviera en un componente hijo, los demás no podrían verlo. App.tsx es el padre común de todos, entonces es el lugar correcto para guardar datos que varios componentes necesitan compartir.

¿Qué diferencia hay entre un componente presentacional y un componente contenedor? ¿A cuál categoría pertenece cada uno de los tres componentes (App, PokemonList, PokemonCard)?

Un componente contenedor maneja lógica: hace fetches, maneja estado, toma decisiones. Un componente presentacional solo recibe props y las muestra, no sabe nada del mundo exterior.

App.tsx → contenedor
PokemonList.tsx → presentacional
PokemonCard.tsx → contenedor (tiene su propio fetch y estado)

Si no pusieras [name] como dependencia del useEffect en PokemonCard, ¿qué problema concreto ocurriría?

El fetch solo correría una vez al montar el componente. Si el nombre del pokémon cambiara (por ejemplo si implementaras paginación), la card nunca actualizaría sus datos y seguiría mostrando la info del pokémon original.

¿Por qué se usan dos interfaces distintas (PokemonListItem y PokemonDetail) en lugar de modelar todo con una sola?

Porque son dos respuestas de dos endpoints distintos. El primero devuelve objetos muy simples con solo nombre y URL. El segundo devuelve un objeto complejo con tipos, stats e imágenes. Mezclarlos en una sola interfaz haría que TypeScript no pueda ayudarte a detectar errores.

¿Qué ventaja tiene que PokemonList no sepa nada de la API? ¿Cómo facilita eso el testing o la reutilización del componente?

Que es reutilizable y fácil de testear. Si mañana cambiás la API por otra, o querés testear PokemonList en aislamiento, podés pasarle cualquier array de datos sin tocar nada dentro del componente. No tiene dependencias externas, solo trabaja con lo que le llegue por props.