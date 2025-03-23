const COPY_BUTTON_TEXT_BEFORE = 'Copy';
const COPY_BUTTON_TEXT_AFTER = 'Copied';

const copyBlockCode = async (target) => {
  try {
    const code = target.closest('pre').querySelector('code').textContent;
    await navigator.clipboard.writeText(code);
    target.textContent = COPY_BUTTON_TEXT_AFTER;
    setTimeout(() => {
      target.textContent = COPY_BUTTON_TEXT_BEFORE;
    }, 1000);
  } catch (error) {
    alert('코드를 복사할 수 없습니다. 다시 시도해 주세요.');
    console.error(error);
  }
};

const codeHeader = `
  <div class="code-header">
    <span class="red btn"></span>
    <span class="yellow btn"></span>
    <span class="green btn"></span>
    <button type="button" class="copy-btn" onclick="copyBlockCode(this)">Copy</button>
  </div>`;

const codeBlocks = document.querySelectorAll('pre > code');

for (const codeBlock of codeBlocks) {
  const codeContent = codeBlock.innerHTML.split('\n').map(line => `<div class="line">${line}</div>`).join('');
  const codeBody = `<div class="code-body">${codeContent}</div>`;
  
  codeBlock.innerHTML = codeHeader + codeBody;
}
