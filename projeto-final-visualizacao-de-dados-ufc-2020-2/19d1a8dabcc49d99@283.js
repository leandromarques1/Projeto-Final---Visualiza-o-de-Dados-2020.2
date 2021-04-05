// https://observablehq.com/@leandromarques1/projeto-final-visualizacao-de-dados-ufc-2020-2@283
export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], function(md){return(
md`# PROJETO FINAL - Visualização de Dados UFC - 2020.2`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`<b>Aluno:</b> Anderson Leandro de M. M. Rocha
<br><b>Curso:</b> Engenharia de Computação
<br><b>Matrícula:</b> 398177
<br><b>Disciplina:</b> Visualização de dados
<br><b>Profª:</b> Emanuele Santos
`
)});
  main.variable(observer("buildvis")).define("buildvis", ["md","container","dc","yearScaleFires","yearDim","firesGroup","d3","stateDim","firesStateGroup","topFiveStateDim","topFiveStateGroup","propFiveStateDim","propFiveStateGroup"], function(md,container,dc,yearScaleFires,yearDim,firesGroup,d3,stateDim,firesStateGroup,topFiveStateDim,topFiveStateGroup,propFiveStateDim,propFiveStateGroup)
{
  let view = md`${container()}`
  let byYearBarChart = dc.barChart(view.querySelector("#firesByYear-chart"));
  let byStateRowChart = dc.rowChart(view.querySelector("#firesByState-Rowchart"));
  let byStatePieChart = dc.pieChart(view.querySelector("#firesByState-Piechart"));
  let byStateRowChartTopFive = dc.rowChart(view.querySelector("#firesByState-Rowchart_TopFive"));
  let byStateProportionRowChartTopFive = dc.rowChart(view.querySelector("#firesByStateProp-Rowchart_TopFive"));
  
  
  
  byYearBarChart.width(800) 
            .height(400) 
            .margins({top: 40, right: 150, bottom: 25, left: 50})
            .x(yearScaleFires) 
            .gap(70) 
            .dimension(yearDim) //chave: eixo horizontal 
            .group(firesGroup, 'Nº de Focos de Incêndio')
            .renderHorizontalGridLines(true)
            .legend(dc.legend().x(200).y(5).itemHeight(13).gap(5)) 
            .brushOn(false) 
            .x(d3.scaleOrdinal())
            .xUnits(dc.units.ordinal)
            .elasticY(true);
  
  byStateRowChart.width(800) 
            .height(500)  
            .margins({top: 40, right: 150, bottom: 25, left: 50})
            .gap(1) 
            .dimension(stateDim) 
            .group(firesStateGroup, 'Quantidade de focos de Incêndio')  
            //.dimension(topFiveStateDim)
            //.group(topFiveStateGroup)
            .ordinalColors('red')
            .legend(dc.legend().x(800-200).y(10).itemHeight(13).gap(5)) 
            .elasticX(true);
  
  byStatePieChart.width(800) //largura do gráfico (pega a largura da célula
          .height(500) // altura do gráfico
          .dimension(stateDim)
          .group(firesStateGroup, 'Quantidade de Focos de Incêndio')
          //.dimension(topFiveStateDim)
          //.group(topFiveStateGroup)
          //.ordinalColors(d3.schemeYlOrRd[6])
          .radius(300) 
          .innerRadius(40)
          .transitionDuration(1000) 
          .slicesCap(5)
          .externalLabels(50)
          .externalRadiusPadding(50)
          .drawPaths(true)
          .legend(dc.legend().highlightSelected(true))
          .renderLabel(true)
          .on('pretransition', function(chart) {
              byStatePieChart.selectAll('text.pie-slice')
                             .text(function(d) {
                return d.data.key + ': ' + dc.utils.printSingleValue((d.endAngle - d.startAngle) / (2*Math.PI) * 100) + '%';
            })
    });

    byStateRowChartTopFive.width(800) 
            .height(400)  
            .margins({top: 40, right: 150, bottom: 25, left: 50})
            .gap(2) 
            //.dimension(stateDim) 
            //.group(firesStateGroup,)  
            .dimension(topFiveStateDim,  'Quantidade de focos de Incêndio')
            .group(topFiveStateGroup)
            .ordinalColors('red')
        .legend(dc.legend().x(800-200).y(10).itemHeight(13).gap(5)) 
            .elasticX(true);
  
  
    byStateProportionRowChartTopFive.width(800) 
            .height(400)  
            .margins({top: 40, right: 150, bottom: 25, left: 50})
            .gap(2) 
            .dimension(propFiveStateDim)
            .group(propFiveStateGroup, 'Nº de Focos de Incêndio (Proporcional à Área do Estado)') 
            //.ordinalColors(['purple'])
            .ordinalColors('red')
        .legend(dc.legend().x(800-200).y(10).itemHeight(13).gap(5)) 
            .elasticX(true);
  
  

  //byYearBarChart.render();
  dc.renderAll();
  return view
}
);
  main.variable(observer()).define(["md"], function(md){return(
md`==========================================================================================================
<h5>Códigos da Visualização estão abaixo:</h5>
==========================================================================================================`
)});
  main.variable(observer()).define(["md"], function(md){return(
md`==========================================================================================================`
)});
  main.variable(observer("container")).define("container", function(){return(
function container(){
  return`
<main role="main" class="container" style="text-align: justify; font-size: 1.25em;">
    <img src="https://www.infoescola.com/wp-content/uploads/2017/05/incendio-florestal-48032821.jpg" style="width: 100%;">
    <h1>Análise sobre Incêndios no Brasil no período de 2011 até novembro de 2017</h1>
    <p>Incêndios florestais constituem um dos principais agentes poluidores da Atmosfera Terrestre, injetando milhões e milhões de Toneladas de carbono na atmosfera e contribuindo para o Aquecimento Global. Embora muitas medidas tenham sido adotadas para diminuir esse problema, muito ainda precisa ser feito para que resultados reais sejam perceptíveis.</p>
	    <p>O Brasil é um dos países com a maior quantidade de focos de incêndio no mundo. Seja pelo seu tamanho continental, seja pelo avanço do setor agropecuário (que é um dos mais fortes do mundo), ou seja o descaso de muitas pessoas acerca da preservação ambiental, o nosso país aparece na lista dos maiores poluidores da atmosfera terrestere justamente devido à contribuição dada pelas queimadas.</p>
      <p>A Presente visualização de dados foi construída tendo por base dados coletadas do número de focos de incêndio em um período de 2011 até novembro de 2017. A base de Dados foi tirada de <a href="https://www.kaggle.com/gustavomodelli/forest-fires-in-brazil">Forest Fires in Brazil - Kaggle</a>, que registrou e organizou dados obtidos do <a href="http://dados.gov.br/dataset/sistema-nacional-de-informacoes-florestais-snif "> site oficial do governo brasileiro</a>. Este conjunto de dados reporta o número de incêndios florestais no Brasil dividido por estados compreendendo um período de quase 20 anos (1998 a 2017). Será trabalhado um período de tempo menor, correspondente à decada de 2010.</p>   
    <div class="row" id="firesByYear-chart">
	      <h3 > Nº Total de Focos de Incêndio por Ano </h3>
	    </div>

    <div class="row" style="color: white;"><p>ESPAÇO</p></div>
    <div class="row" id="firesByState-Rowchart">
	    <h3> Ranking de Estados</h3>
      <p>Abaixo, podemos ver um gráfico que representa um ranking dos estados de acordo com o período de tempo selecionado no gráfico anterior.</p>
	  </div>

    <div class="row" style="color: white;"><p>ESPAÇO</p></div>
    <div class="row" id="firesByState-Piechart">
	    <h3> Percentual de Contribuição dos Principais Estados</h3>
        <p>Abaixo, podemos ver um gráfico que representa análise do percentual de contribuição dos Estados com mais focos. </p>
	  </div>

    <div class="row" style="color: white;"><p>ESPAÇO</p></div>
    <div class="row" id="firesByState-Rowchart_TopFive">
      <h3> Estados com maior Quantidade de Focos de Incêndio no Período</h3>
      <p>Top 5 dos Estados com mais registros de incêndio no período de janeiro de 2011 até novembro de 2017</p>
    </div>

    <div class="row" style="color: white;"><p>ESPAÇO</p></div>
    <div class="row" id="firesByStateProp-Rowchart_TopFive">
      <h3> Ranking de Estados com mais focos de Incêndio por uma área de 1000km²</h3>
      <p>Ao analisar esses dados, um fato se tornou interessante de ser observado: estados com maior Área iriam obviamente ter um maior número de focos de incêndio. Tendo isso em mente, foi pensada em uma nova visualização, em que se analisaria <b>o numero de focos de incêndios a cada 1000km² de território</b> de cada Estado. O objetivo com isso é verificar quais os Estados que apresentavam a maior quantidade de focos de incêndio proporcional ao seu tamanho. O Resultado foi esse:</p>
    </div>
    <div class="row" style="color: ;">
        <p>Alguns destaques que podemos fazer:</p>
        <ul>
          <li>Os Estados de <b>Maranhão</b>, <b>Tocantins</b> e <b>Piauí</b> encabeçam o rankinga da quantidade de incêndios a cada 1000km² de território. Juntamente com <b>Rondônia</b> (que também está no Ranking), são Estados em que a Agropecuária avança bastante. São estados que experimentam a <b>expansão da Fronteira Agrígola</b>, que ameaça principalmente os <b>Biomas do Cerrado</b> e da <b>Amazônia.</b> </li>
          <li><b>Distrito Federal</b>, embora tenha aproximadamente 5000km², apresenta uma grande quandtidade de focos de incêndio. É uma região que está situada em pleno Cerrado, bioma bastante afetada pelas atiidades Agropecuárias</li>
        </ul>
    </div>

    <div class="row" style="color: white;"><p>ESPAÇO</p></div>
    <div class="row">
      <h3> MAPA - analisando a situação no ano de 2017 (de janeiro a novembro)</h3>
    </div> 
    <div class="row" id="mapid"></div>
    <div class="row" style="color: white;"><p>ESPAÇO</p></div>
    <div class="row">
        <ul>
          <li>2017 nem havia acabado e já apresentava um aumento de aproximadamente 36,6% em relação ao ano anterior.</li>
          <li>Analisando o mapa, podemos ver o destaque dado aos estados de <b>Pará</b>, <b>Mato Grosso</b>, <b>Tocantins</b> e <b>Maranhão</b>, estados que presenciam a  expansão da fronteira agrícola.</li>
        </ul>
    </div>
        
	  </div>
    
    
    
	  

</main>
`
}
)});
  main.variable(observer("map")).define("map", ["buildvis","L"], function(buildvis,L)
{
  buildvis; 
  let mapInstance = L.map('mapid').setView([-14.8384768,-51.6129288], 4)
  
  //Opção 1
  L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {     
    attribution: '&copy; <a href="http://www.openstreetmap.org/">OpenStreetMap</a> contributors',     
    maxZoom: 17     
  }).addTo(mapInstance)  
    
  //Opção 2
  /*L.tileLayer("https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png", {
                attribution:  `&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>,
 Map tiles by &copy; <a href="https://carto.com/attribution">CARTO</a>`,
                maxZoom: 18
                }).addTo(mapInstance)
  */
  return mapInstance
}
);
  main.variable(observer("estados")).define("estados", ["d3"], function(d3){return(
d3.json('https://gist.githubusercontent.com/leandromarques1/d67a0c68fb999f6e402308c7880bcbe2/raw/6d3efc2eb98a1d2e6297b58d45c4db34a340eabe/brasil_estados.json')
)});
  main.variable(observer("colorScale")).define("colorScale", ["d3","numberFiresDimension","reds"], function(d3,numberFiresDimension,reds){return(
d3.scaleQuantize()
                .domain([0, numberFiresDimension.top(1)[0].numberFires]) 
                .range(reds)
)});
  main.variable(observer("reds")).define("reds", ["d3"], function(d3){return(
d3.schemeYlOrRd[9]
)});
  main.variable(observer("statesFiresByName")).define("statesFiresByName", ["d3"], function(d3){return(
d3.csv('https://gist.githubusercontent.com/leandromarques1/599b79eb31cf7ef1b9e988a9b21fa706/raw/8bad34011d8f09c0edff704558d0a530e484eb96/firesByStates_situacao2017.csv').then(function(data) {  
/*statesFiresByName = d3.csv('https://gist.githubusercontent.com/leandromarques1/599b79eb31cf7ef1b9e988a9b21fa706/raw/7f05aa6a6a3f98bbb95c4c55040cb4d688cf50c0/firesByStates_NivelSuperBasico.csv').then(function(data) {*/
  let estadosMap = new Map()
    data.forEach(function(d) {
      //let nameCorrected = d.nome_uf.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase() //para remover Caracteres Acentuados de Strings e deixá-las em LETRA MAIÚSCULA 
      estadosMap.set(d.State,+d.numberFires)
      
      //estadosMap.set(nameCorrected, +d.numberFires)
        })
    return estadosMap;
  })
)});
  main.variable(observer("style")).define("style", ["colorScale","statesFiresByName"], function(colorScale,statesFiresByName){return(
function style(feature) {
     let color = colorScale(statesFiresByName.get(feature.properties.nome_uf))
     return {
					weight: 1,
					opacity: 1,
					//color: 'white',
					color: '#191970',
          dashArray: '3',
					fillOpacity: 0.6,
					fillColor: color 
				};
	}
)});
  main.variable(observer("geojson")).define("geojson", ["L","info","map","estados","style"], function(L,info,map,estados,style)
{
  function highlightFeature(e) 
  {
		let layer = e.target;
        //console.log(e.target)

		layer.setStyle(
    {
					weight: 2,
					color: '#AAA',
					dashArray: '',
					fillOpacity: 0.7
		});

		if (!L.Browser.ie && !L.Browser.opera) 
    {
			layer.bringToFront();
		}

		info.update(layer.feature);
	}
	let geoj;

	function resetHighlight(e) 
  {
		geoj.resetStyle(e.target);
		info.update();
	}

	function zoomToFeature(e) 
  {
		map.fitBounds(e.target.getBounds());
	}

	function onEachFeature(feature, layer) 
  {
		layer.on({
					mouseover: highlightFeature,
					mouseout: resetHighlight,
					click: zoomToFeature
				});
	}
  /*Daqui pra cima é padrão*/
  /*========================================*/
  /*Começa aqui a diferenciar */
  geoj = L.geoJson(estados, {
				style: style,
				onEachFeature: onEachFeature
		}).addTo(map)
  return geoj;
}
);
  main.variable(observer("legend")).define("legend", ["L","reds","colorScale","d3","map"], function(L,reds,colorScale,d3,map)
{
  let legendControl = L.control({position: 'bottomright'});

	legendControl.onAdd = function (map) {

		let div = L.DomUtil.create('div', 'info legend'),
			labels = [],
            n = reds.length,
			from, to;

		for (let i = 0; i < n; i++) {
			let c = reds[i]
            let fromto = colorScale.invertExtent(c);
			labels.push(
				'<i style="background:' + reds[i] + '"></i> ' +
				d3.format("d")(fromto[0]) + (d3.format("d")(fromto[1]) ? '&ndash;' + d3.format("d")(fromto[1]) : '+'));
		}
    
    let fromto = colorScale.invertExtent(reds[n-1]);
    labels[n-1] = '<i style="background:' + reds[n-1] + '"></i> ' +
				d3.format("d")(fromto[0]) + '&ndash; acima de ' + d3.format("d")(fromto[0])

		div.innerHTML = labels.join('<br>')
		return div
	}

   	legendControl.addTo(map)
  return legendControl
}
);
  main.variable(observer("info")).define("info", ["L","statesFiresByName","map"], function(L,statesFiresByName,map)
{
  // control that shows state info on hover
	let infoControl = L.control()

	infoControl.onAdd = function (map) {
		this._div = L.DomUtil.create('div', 'info');
		this.update();
		return this._div;
	}

	/*infoControl.update = function (feat) {
			this._div.innerHTML = '<h5>Quantidade de Fogo:</h5>' +  (feat ?
				'<b>' + feat.properties.nome_uf + '</b> '+'<br/>Nº de focos de incêndio: ' + statesFiresByName.get(feat.properties.nome_uf) + ' focos de incêndios' 
				: 'Passe o mouse sobre um bairro');
	}*/
  infoControl.update = function (feat) {
        this._div.innerHTML = '<h5>Número Absoluto de Focos de Incêndio:</h5>' +  (feat ?
          '<b>' + feat.properties.nome_uf + '</b><br />Quantidade: '+ statesFiresByName.get(feat.properties.nome_uf) + ' focos'
          : 'Passe o mouse sobre uma Unidade da Federação');
    }
  
    infoControl.addTo(map);
    return infoControl
  }
);
  main.variable(observer("yearScaleFires")).define("yearScaleFires", ["d3"], function(d3){return(
d3.scaleLinear()
)});
  main.variable(observer("firesByYear")).define("firesByYear", ["d3"], function(d3){return(
d3.csv("https://gist.githubusercontent.com/leandromarques1/4c9318778b772b7a19c4e83e02d5a1c4/raw/e9f9d0842aad8057aea3d9be70a24a2815a4485e/firesByStates_NivelBasico.csv").then(function(data){
/*firesByYear = d3.csv('https://gist.githubusercontent.com/leandromarques1/599b79eb31cf7ef1b9e988a9b21fa706/raw/7f05aa6a6a3f98bbb95c4c55040cb4d688cf50c0/firesByStates_NivelSuperBasico.csv').then(function(data) {*/
  data.forEach(function(d) {
    //Converter String p/ Numérico  
     d.numberFires = +d.numberFires;
      //--> outra forma de escrever a linha acima
     //d.numberFires = Number.parseInt(d.numberFires); 
    
    //Área de cada Estado ou UF do Brasil (em km²)
    d.AreaEstados = +d.AreaEstados;  //Converter de String p/ Numérico
    
    //Proporção do Nº de Focos de Incêndio em uma área de 1000km² (por Estado)
    //d.Proportion = ((+d.numberFires)/(+d.AreaEstados)*1000);
    d.Proportion = +(((+d.numberFires)/(+d.AreaEstados)*1000).toFixed(2));//Arredondando Valor para 3 casas decimais
      
     })
   return data  
})
)});
  main.variable(observer("factsFires")).define("factsFires", ["crossfilter","firesByYear"], function(crossfilter,firesByYear){return(
crossfilter(firesByYear)
)});
  main.variable(observer("yearDim")).define("yearDim", ["factsFires"], function(factsFires){return(
factsFires.dimension(d => d.Year)
)});
  main.variable(observer("firesGroup")).define("firesGroup", ["yearDim"], function(yearDim){return(
yearDim.group().reduceSum(d => d.numberFires)
)});
  main.variable(observer("stateDim")).define("stateDim", ["factsFires"], function(factsFires){return(
factsFires.dimension(d => d.State)
)});
  main.variable(observer("numberFiresDimension")).define("numberFiresDimension", ["factsFires"], function(factsFires){return(
factsFires.dimension(d => d.numberFires)
)});
  main.variable(observer("firesStateGroup")).define("firesStateGroup", ["stateDim"], function(stateDim){return(
stateDim.group().reduceSum(d => d.numberFires)
)});
  main.variable(observer("topFiveMaxFires")).define("topFiveMaxFires", ["firesStateGroup"], function(firesStateGroup){return(
firesStateGroup.top(5)
)});
  main.variable(observer("factsTopFires")).define("factsTopFires", ["crossfilter","topFiveMaxFires"], function(crossfilter,topFiveMaxFires){return(
crossfilter(topFiveMaxFires)
)});
  main.variable(observer("topFiveStateDim")).define("topFiveStateDim", ["factsTopFires"], function(factsTopFires){return(
factsTopFires.dimension(d => d.key)
)});
  main.variable(observer("topFiveStateGroup")).define("topFiveStateGroup", ["topFiveStateDim"], function(topFiveStateDim){return(
topFiveStateDim.group().reduceSum(d => d.value)
)});
  main.variable(observer("prop")).define("prop", ["stateDim"], function(stateDim){return(
stateDim.group().reduceSum(d => ((d.numberFires/d.AreaEstados)*1000).toFixed(3))
)});
  main.variable(observer("propTopFires")).define("propTopFires", ["crossfilter","propFiveMaxFires"], function(crossfilter,propFiveMaxFires){return(
crossfilter(propFiveMaxFires)
)});
  main.variable(observer("propFiveMaxFires")).define("propFiveMaxFires", ["prop"], function(prop){return(
prop.top(5)
)});
  main.variable(observer("propFiveStateDim")).define("propFiveStateDim", ["propTopFires"], function(propTopFires){return(
propTopFires.dimension(d => d.key)
)});
  main.variable(observer("propFiveStateGroup")).define("propFiveStateGroup", ["propFiveStateDim"], function(propFiveStateDim){return(
propFiveStateDim.group().reduceSum(d => d.value)
)});
  main.variable(observer()).define(["html"], function(html){return(
html`<code>css</code> <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
<link rel="stylesheet" type="text/css" href="https://unpkg.com/dc@4/dist/style/dc.css" />
<link rel="stylesheet" href="https://unpkg.com/leaflet@1.6.0/dist/leaflet.css"
integrity="sha512-xwE/Az9zrjBIphAcBb3F6JVqxf46+CDLwfLMHloNu6KEQCAWi6HcDUbeOfBIptF7tcCzusKFjFw2yuvEpDL9wQ=="
crossorigin=""/>

`
)});
  main.variable(observer()).define(["html"], function(html){return(
html`Esta célula contém os estilos da Visualização
<style>
#mapid {
				width: 750px;
				height: 590px;
			}
			.info {
				padding: 6px 8px;
				font: 14px/16px Arial, Helvetica, sans-serif;
				background: white;
				background: rgba(255,255,255,0.8);
				box-shadow: 0 0 15px rgba(0,0,0,0.2);
				border-radius: 5px;
			}
			.info h4 {
				margin: 0 0 5px;
				color: #777;
			}

			.legend {
				text-align: left;
				line-height: 18px;
				color: #555;
			}
			.legend i {
				width: 18px;
				height: 18px;
				float: left;
				margin-right: 8px;
				opacity: 0.7;
			}
</style>`
)});
  main.variable(observer("L")).define("L", ["require"], function(require){return(
require('leaflet@1.6.0')
)});
  main.variable(observer("crossfilter")).define("crossfilter", ["require"], function(require){return(
require('crossfilter2')
)});
  main.variable(observer("dc")).define("dc", ["require"], function(require){return(
require('dc')
)});
  main.variable(observer("d3")).define("d3", ["require"], function(require){return(
require("d3@5")
)});
  main.variable(observer()).define(["html"], function(html){return(
html`<link rel="stylesheet" type="text/css" href="https://unpkg.com/dc@4/dist/style/dc.css" />`
)});
  main.variable(observer("$")).define("$", ["require"], function(require){return(
require('jquery').then(jquery => {
  window.jquery = jquery;
  return require('popper@1.0.1/index.js').catch(() => jquery);
})
)});
  main.variable(observer("bootstrap")).define("bootstrap", ["require"], function(require){return(
require('bootstrap')
)});
  return main;
}
