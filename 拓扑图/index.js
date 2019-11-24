// console.log(echarts)
var myChart = echarts.init(document.getElementById('main'));

const list3 = [{
    name: 'a',
    parent: 'b'
}, {
    name: 'a',
    parent: 'c'
}, {
    name: 'b',
    parent: 'd'
}, {
    name: 'c',
    parent: 'd'
},
{
    name: 'd',
    parent: 'g'
},
{
    name: 'b',
    parent: 'e'
},
{
    name: 'c',
    parent: 'f'
},
{
    name: 'e',
    parent: 'g'
},
{
    name: 'f',
    parent: 'g'
}
]
const list = [{
    name: 'a',
    parent: 'c'
}, {
    name: 'a',
    parent: 'b'
}, {
    name: 'b',
    parent: 'd'
}, {
    name: 'c',
    parent: 'd'
},
{
    name: 'd',
    parent: 'e'
},
{
    name: 'e',
    parent: 'f'
},
{
    name: 'e',
    parent: 'g'
},
{
    name: 'f',
    parent: 'h'
},
{
    name: 'f',
    parent: 'i'
},
{
    name: 'g',
    parent: 'j'
},
{
    name: 'g',
    parent: 'k'
},
{
    name: 'i',
    parent: 'l'
},
{
    name: 'j',
    parent: 'l'
},
{
    name: 'l',
    parent: 'm'
},
{
    name: 'h',
    parent: 'm'
},
{
    name: 'k',
    parent: 'm'
},
]

console.log('list')
console.log(list)
const links = list.map((item) => {
    return {
        source: item.name,
        target: item.parent
    }
})

console.log('links')
console.log(links)

const res = {}
list.forEach((item) => {
    const { name, parent } = item
    if (!res[name]) {
        res[name] = []
        res[name].push(parent)
    } else {
        res[name].push(parent)
    }
})

console.log('构建父子数组')
console.log(res)
const root = {
    name: 'a',
    parent: []
}
root.level = 1
root.y = 1
root.parent = res[root.name]

// console.log(root)
res2 = []
res2.push(root)
fn(root, root.parent)
console.log('计算层级')
console.log(res2)
function fn(root, parent) { // root根节点，parent: 根节点父亲
    if (!parent || parent.length == 0) return
    parent.forEach((item, index) => {
        let single = true
        res2.forEach((ite) => { // 保证res2中不重复
            if (ite.name == item) {
                single = false
            }
        })
        single && res2.push({
            name: item,
            parent: res[item],
            level: root.level + 1,
            y: index + 1
        })
    })
    parent.forEach((item) => {
        let itemobj = res2.findIndex((i) => {
            return i.name == item
        })
        itemobj = res2[itemobj]
        fn(itemobj, itemobj.parent)
    })
}
const width = 600
const height = 400
const n = 4
const j = 2
const xx = width / n
const yy = height / (j * 2)

// 计算高度层级
const map = {}
const temp = res2.map((ite) => {
    if (!map[ite.level]) {
        map[ite.level] = 1
    } else {
        map[ite.level] = map[ite.level] + 1
    }
    ite.y = map[ite.level]
    return ite
})
console.log('修正高度层级')
console.log(temp)

const res3 = res2.map((item) => {
    return {
        name: item.name,
        x: item.level * xx,
        y: yy * (2 * item.y - 1)
    }
})
console.log('计算坐标')
console.log(res3)
// const res4 = []
// res3.forEach((ite) => {
//     if (res4.indexOf(ite) < 0) {
//         res4.push(ite)
//     }
// })
// console.log(res4)
option = {
    title: {
        text: 'Graph 简单示例'
    },
    tooltip: {},
    animationDurationUpdate: 1500,
    animationEasingUpdate: 'quinticInOut',
    series: [
        {
            type: 'graph',
            layout: 'none',
            symbolSize: 50,
            roam: true,
            label: {
                normal: {
                    show: true
                }
            },
            edgeSymbol: ['circle', 'arrow'],
            edgeSymbolSize: [4, 10],
            edgeLabel: {
                normal: {
                    textStyle: {
                        fontSize: 20
                    }
                }
            },
            data: res3,
            links: links,
            lineStyle: {
                normal: {
                    opacity: 0.9,
                    width: 2,
                    curveness: 0
                }
            }
        }
    ]
};

myChart.setOption(option)
