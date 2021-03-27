// import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'
// import Title from 'components/Title'

// type RenderType = {
//   cx: any
//   cy: any
//   midAngle: any
//   innerRadius: any
//   outerRadius: any
//   percent: any
// }

// const data = [
//   { name: 'Group A', value: 400 },
//   { name: 'Group B', value: 300 },
//   { name: 'Group C', value: 300 },
//   { name: 'Group D', value: 200 },
// ]

// const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']

// const RADIAN = Math.PI / 180
// const renderCustomizedLabel = ({
//   cx,
//   cy,
//   midAngle,
//   innerRadius,
//   outerRadius,
//   percent,
// }: RenderType): JSX.Element => {
//   const radius = innerRadius + (outerRadius - innerRadius) * 0.5
//   const x = cx + radius * Math.cos(-midAngle * RADIAN)
//   const y = cy + radius * Math.sin(-midAngle * RADIAN)

//   return (
//     <text
//       x={x}
//       y={y}
//       fill="white"
//       textAnchor={x > cx ? 'start' : 'end'}
//       dominantBaseline="central"
//     >
//       {`${(percent * 100).toFixed(0)}%`}
//     </text>
//   )
// }

const Chart = () => {
  //   return (
  //     <>
  //       <Title>今月のグラフ</Title>
  //       {/* パイチャート描画 */}
  //       <ResponsiveContainer width="100%" height="100%">
  //         <PieChart width={400} height={400}>
  //           <Pie
  //             data={data}
  //             cx="50%"
  //             cy="50%"
  //             labelLine={false}
  //             label={renderCustomizedLabel}
  //             outerRadius={80}
  //             fill="#8884d8"
  //             dataKey="value"
  //           >
  //             {data.map((index: any) => (
  //               <Cell
  //                 key={`cell-${index}`}
  //                 fill={COLORS[index % COLORS.length]}
  //               />
  //             ))}
  //           </Pie>
  //         </PieChart>
  //       </ResponsiveContainer>
  //       {/* ラインチャート描画 */}
  //       {/* <ResponsiveContainer>
  //         <LineChart
  //           data={data}
  //           margin={{
  //             top: 16,
  //             right: 16,
  //             bottom: 0,
  //             left: 24,
  //           }}
  //         >
  //           <XAxis dataKey="time" stroke={theme.palette.text.secondary} />
  //           <YAxis stroke={theme.palette.text.secondary}>
  //             <Label
  //               angle={270}
  //               position="left"
  //               style={{ textAnchor: 'middle', fill: theme.palette.text.primary }}
  //             >
  //               出費(円)
  //             </Label>
  //           </YAxis>
  //           <Line
  //             type="monotone"
  //             dataKey="amount"
  //             stroke={theme.palette.primary.main}
  //             dot={false}
  //           />
  //         </LineChart>
  //       </ResponsiveContainer> */}
  //     </>
  //   )
}

export default Chart
