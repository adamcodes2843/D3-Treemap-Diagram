let url = "https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/video-game-sales-data.json"

let videoGameData

let svg = d3.select('#canvas')
let tooltip = d3.select('#tooltip')

let drawRectangles = () => {

    let hierarchy = d3.hierarchy(videoGameData, (node) => {
        return node['children']
    }).sum((node) => {
        return node['value']
    }).sort((node1, node2) =>{
        return node2['value'] - node1['value']
    })

    let createTreeMap = d3.treemap()
                    .size([1200, 800])
                    .padding(1)

    createTreeMap(hierarchy)

    let gameTiles = hierarchy.leaves()
    console.log(gameTiles)

    let tile = svg.selectAll('g')
                        .data(gameTiles)
                        .enter()
                        .append('g')
                        .attr('transform', (d) =>{
                            return 'translate(' + d['x0'] + ', ' + d['y0'] + ')'
                        })

    tile.append('rect')
            .attr('class', 'tile')
            .attr('data-name', (d) => d['data']['name'])
            .attr('data-category', (d) => d['data']['category'])
            .attr('data-value', (d) => d['data']['value'])
            .attr('fill', (d) => {
                let category = d['data']['category']
                if(category === 'Wii'){
                    return 'lightsteelblue'
                }else if(category === 'DS'){
                    return 'lightblue'
                }else if(category === 'X360'){
                    return 'orange'
                }else if(category === 'GB'){
                    return 'coral'
                }else if(category === 'PS3'){
                    return 'aquamarine'
                }else if(category === 'NES'){
                    return 'darkseagreen'
                }else if(category === 'PS2'){
                    return 'lightgreen'
                }else if(category === '3DS'){
                    return 'indianred'
                }else if(category === 'PS4'){
                    return 'lightsalmon'
                }else if(category === 'SNES'){
                    return 'violet'
                }else if(category === 'PS'){
                    return 'lightcoral'
                }else if(category === 'N64'){
                    return 'pink'
                }else if(category === 'GBA'){
                    return 'tan'
                }else if(category === 'XB'){
                    return 'plum'
                }else if(category === 'PC'){
                    return 'yellow'
                }else if(category === '2600'){
                    return 'gold'
                }else if(category === 'PSP'){
                    return 'linen'
                }else if(category === 'XOne'){
                    return 'lightgrey'
                }
            })
            .attr('width', (d) => d['x1'] - d['x0'])
            .attr('height', (d) => d['y1'] - d['y0'])
            .on('mouseover', (d) =>{
                tooltip.transition()
                        .style('visibility', 'visible')

                let textInfo = d['data']

                tooltip.text(
                    textInfo['category'] + ' / ' + textInfo['name'] + ' / Value: ' + textInfo['value']
                )
                tooltip.attr('data-value', d['data']['value'])
            })
            .on('mouseout', (d) =>{
                tooltip.transition()
                        .style('visibility', 'hidden')
            })

    tile.append('text')
            .text((d) => d['data']['name'])
            .attr('x', 5)
            .attr('y', 20)
}

d3.json(url).then(
    (data, error) => {
        if(error){
            console.log(error)
        }else{
            videoGameData = data
            console.log(videoGameData)
            drawRectangles()
        }
    }
)