# Game

### Schema

```ts
type Board = {
    width: number;
    heigth: number;
}

type Position = {
    x: number;
    y: number;
}

type Fruit = {
    position: Position;
}

type Player = {
    id: string;
    score: number;
    position: Position;
}
```

### Variavel Global
- vetor de objetos player.(players)
- vetor de objetos fruit.(fruits)


### Casos de Uso
- O usuario manda para o servidor a direção da jogada.(event['move'])
- A partir da direção o servidor atualiza a posição do player.
- A cada periodo sera enviado a posição de todos atualizada.(event['update'])


