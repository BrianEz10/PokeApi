¿Por qué el estado de la lista de pokémon vive en App.tsx y no en PokemonList o PokemonCard?

Porque App.tsx es el componente principal y tanto PokemonList como PokemonCard necesitan acceder a esa información. Si lo pusiera en un componente hijo, los demás no podrían verlo. Al tenerlo en App.tsx puedo pasarlo hacia abajo a quien lo necesite.

¿Qué diferencia hay entre un componente presentacional y un componente contenedor? ¿A cuál categoría pertenece cada uno de los tres componentes (App, PokemonList, PokemonCard)?

Un componente contenedor es el que se encarga de buscar datos y manejar la lógica, mientras que uno presentacional solo muestra lo que le llega por props sin hacer nada más. En este proyecto App.tsx y PokemonCard son contenedores porque hacen fetches y manejan estado, y PokemonList es presentacional porque solo recibe los datos y los muestra.

Si no pusieras [name] como dependencia del useEffect en PokemonCard, ¿qué problema concreto ocurriría?

El fetch solo se ejecutaría una vez cuando el componente aparece en pantalla. Si el nombre del pokémon cambiara por alguna razón, la card no se actualizaría y seguiría mostrando los datos del pokémon original, lo cual sería un bug.

¿Por qué se usan dos interfaces distintas (PokemonListItem y PokemonDetail) en lugar de modelar todo con una sola?

Porque son dos respuestas diferentes de dos endpoints distintos. La lista solo me devuelve el nombre y la URL, mientras que el detalle trae muchísima más información como los tipos, las stats y las imágenes. No tendría sentido mezclarlos en una sola interfaz.

¿Qué ventaja tiene que PokemonList no sepa nada de la API? ¿Cómo facilita eso el testing o la reutilización del componente?

Que es mucho más fácil de reutilizar y de probar. Como solo trabaja con lo que le pasás por props, si en algún momento cambio de API o quiero usarlo en otro lado, no tengo que tocar nada dentro del componente. Solo le paso los datos y listo.