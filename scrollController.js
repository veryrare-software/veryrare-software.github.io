import { lerp, EasingFunctions } from './utils';


class ScrollController
{
    content
    sections
    forcedScroll = false;
    startScroll;
    desiredScroll;
    timeFromStartScroll;
    onScroll;

    constructor(content, onScroll)
    {
        this.content = content
        this.onScroll = onScroll
    
        this.sections = document.getElementsByClassName("section");

        // init scrollable elements
        for (let s of document.getElementsByClassName("scrollable-next"))
            s.onclick = () => this.scrollToNextSection()

        for (let s of document.getElementsByClassName("scrollable"))
            s.onclick = () => this.scrollToElement( document.querySelector(s.getAttribute('href')))

    }

    scrollToNextSection() {
        let _desiredScroll = content.scrollTop - content.clientHeight;
        _desiredScroll = ((~~(_desiredScroll / content.clientHeight))) * content.clientHeight;
        for (let section of this.sections) {
            // find the next section to scroll to
            if (section.offsetTop + 1 + section.clientHeight - content.clientHeight >= content.scrollTop)
                break;
            _desiredScroll = this.computeSectionScroll(section);
        }
        this.scrollTo(_desiredScroll)
    };

    
    scrollToElement(section) {
        if (!section)
        {
            console.log("SCROLL FAILED - NO SECTION")
            return
        }
        var num = this.computeSectionScroll(section);
        console.log("SCROLL TO - " + section.getAttribute("id") + " " + num);
        this.scrollTo(num);
    }

    computeSectionScroll(section) {
        return section.offsetTop + section.clientHeight - content.clientHeight;
    }


    scrollTo(targetScroll) {
        if (this.forcedScroll) return;
        this.desiredScroll = targetScroll
        this.startScroll = this.content.scrollTop;
        this.timeFromStartScroll = 0;
        this.forcedScroll = true;
        this.onScroll()
    }

    
    update(timeDelta)
    {
        // for scroll animation to specific specific scroll offset
        if (this.forcedScroll) {
            this.timeFromStartScroll += timeDelta * 4;
            if (this.timeFromStartScroll > 1) {
                this.content.scrollTop = this.desiredScroll;
                this.forcedScroll = false;
            } else {
                this.content.scrollTop = lerp(this.startScroll, this.desiredScroll, EasingFunctions.easeInOutQuad(this.timeFromStartScroll));
            }
        }

    }

}

export { ScrollController }