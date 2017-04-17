import {screen, widget, helpers} from 'blessed';
import colormap from 'colormap';

const sprintf = helpers.sprintf;

export default class CliDebugDriver {
  constructor() {
    this.screen = screen({smartCSR: true, autoPadding: true});
    this.table = widget.table({
      width: 161, height: '100%',
      tags: true,
      border: {
        type: 'line',
        fg: '#f0f0f0'
      }
    });

    this.screen.append(this.table);
    this.colormap = colormap({
      colormap: 'hot',
      nshades: 256
    });

    // Render the screen.
    this.update(Buffer.alloc(512, 0));
  }

  update(buffer) {
    this.table.setData(this.formatData(buffer, 16));
    this.screen.render();
  }

  formatData(buffer, columns) {
    const data = Array.from(buffer);
    const ret = [];
    for (let startIndex = 0; startIndex < buffer.length; startIndex += columns) {
      const slice = data.slice(startIndex, startIndex + columns);
      ret.push(slice.map((num, i) => {
        const fg = this.colormap[num];

        return sprintf(
            `{#888888-fg}{bold}%-3d{/}|{${fg}-fg}%03d{/}`,
            startIndex + i + 1,
            num
        );
      }));
    }

    this.lastData = data;
    return ret;
  }

  send(buffer, universe) {
    // FIXME: multi-universe support (tabs?)
    this.update(buffer);
  }
}