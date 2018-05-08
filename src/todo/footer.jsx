//把HTML文件写在js里
import '../assets/styles/footer.styl'
export default{
    data(){
        return {
            author:'xiantian'
        }
    },
    render(){
        return(
            <div id="footer">
            <span>written by {this.author}</span>
            </div>
        )
    }
}