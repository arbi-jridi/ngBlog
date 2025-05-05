import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
@Pipe({
  name: 'stripHtml',
  standalone: false
})
export class StripHtmlPipe implements PipeTransform {
  private codePattern = /(^|\n)(\s)*(import|from|export|const|let|var|function|class|return|if|else|for|while|switch|case|app\.(get|post|use)|router\.|mongo|db\.|schema|model|{|}|=>|\(\)|<%|%>|req|res|<\/?[a-z][\s\S]*?>)(.*?)(?=(\n\s*[^\s]|$))/gsi;

  constructor(private sanitizer: DomSanitizer) {}

  transform(value: string): SafeHtml {
    if (!value) return '';
    
  
    let processed = value.replace(this.codePattern, (match) => {
      if (match.trim().startsWith('<') && match.trim().endsWith('>')) return match;
      return `<pre class="code-block"><code>${match}</code></pre>`;
    });

    // Second pass - clean up HTML
    const parser = new DOMParser();
    const doc = parser.parseFromString(processed, 'text/html');
    this.processNodes(doc.body);
    
    return this.sanitizer.bypassSecurityTrustHtml(doc.body.innerHTML);
  }

  private processNodes(node: Node) {
    Array.from(node.childNodes).forEach(child => {
      if (child.nodeType === Node.ELEMENT_NODE) {
        const element = child as HTMLElement;
        const tagName = element.tagName.toLowerCase();

        if (['p', 'div'].includes(tagName)) {
          const parent = element.parentNode;
          const children = Array.from(element.childNodes);
          const br = document.createElement('br');
          
          parent?.insertBefore(br, element);
          children.forEach(c => parent?.insertBefore(c, element));
          parent?.removeChild(element);

          children.forEach(c => this.processNodes(c));
        } else if (tagName === 'img') {
          element.setAttribute('style', 'max-width: 100%; height: auto;');
        } else {
          this.processNodes(element);
        }
      }
    });
  }
}