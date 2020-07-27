## Simple Slide

Slide simples de transição com navegação.

```js
// 1 - Copie o arquivo simple-slide.js da pasta dist e cole no seu site.

// 2 - Link o arquivo utilizando a tag script /js/plugins é apenas um exemplo, caso você tenha colocado o arquivo dentro da pasta de plugins
<script src="./js/plugins/simple-slide.js"></script>;

// 3 - Inicie a classe do slide:

new SimpleSlide({
  slide: 'principal', // nome do atributo data-slide="principal"
  nav: true, // se deve ou não mostrar a navegação
  auto: true, // se o slide deve passar automaticamente
  time: 5000, // tempo de transição dos slides
  pauseOnHover: true, // pausa a transição automática
});
```

```html
<!-- 4 Adicione o atributo data-slide ao container do seu slide -->

<ul data-slide="principal">
  <li>Slide 1</li>
  <li>Slide 2</li>
  <li>Slide 3</li>
</ul>

<!-- É possível ter mais de um slide na mesma página,
basta adicionar um data-slide com outro nome e instanciar novamente 
o slide com new SimpleSlide() -->
```

```css
/* 5 Adicione o CSS Essencial abaixo */
[data-slide] {
  position: relative;
}
[data-slide] > * {
  position: absolute;
  top: 0px;
  opacity: 0;
}
[data-slide] > .active {
  position: relative;
  opacity: 1;
  transition: opacity 500ms;
  z-index: 1;
}

/* 6 CSS recomendado para a navegação */
[data-slide-nav] {
  display: block;
  justify-content: center;
  text-align: center;
  margin-top: 20px;
}
[data-slide-nav] > button {
  display: inline-block;
  width: 12px;
  margin: 4px;
  height: 12px;
  border: none;
  padding: 0px;
  border-radius: 6px;
  background: #1d1d1d;
  text-indent: -100px;
  overflow: hidden;
}
[data-slide-nav] > button.active {
  background: #fec454;
}
```
