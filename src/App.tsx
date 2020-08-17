import React, { CSSProperties } from 'react';
import { Component } from 'react';
import { Stack, Text, Link, FontWeights, CommandBar, Nav, Breadcrumb, IconType, SearchBox, loadTheme, ScrollablePane, Sticky, StickyPositionType, ScrollbarVisibility } from '@fluentui/react';
import { observer } from 'mobx-react'
import { observable, computed } from 'mobx'
import { initializeIcons } from '@uifabric/icons';
import { Depths } from '@uifabric/fluent-theme';
import logo from './fabric.png';
import { brightcoveTheme } from './brightcove-theme';
import { CommandBarItemWrapper as CommandBarItemWrapper } from './helpers';

// Icons are not in the bundle without this call
initializeIcons();

loadTheme(brightcoveTheme);

const boldStyle = {
  root: { fontWeight: FontWeights.semibold }
};

export class App {
  @observable
  sidebarOpen: boolean = true;
  @observable
  selectedPlan: string = '';
  @observable
  includeUnchangedResources: boolean = false;
  @observable
  filterText: string = '';
}

const scrollPaneWrapperStyles: CSSProperties = {
  height: '100%',
  position: 'relative'
}

@observer
export class AppMarkup extends Component<{ app: App }> {
  render() {
    const { app } = this.props;
    return <>
      <Stack
        // Vertical stack
        // Fill vertical space, allowing children to grow
        verticalFill
        // Children fill all horizontal space
        horizontalAlign="stretch"
      >
        <Stack.Item styles={{
          root: {
            boxShadow: Depths.depth4
          }
        }}>
          <CommandBar items={[
            {
              key: 'nav-toggle',
              text: 'Sidebar On/Off',
              canCheck: true,
              checked: app.sidebarOpen,
              onClick() { app.sidebarOpen = !app.sidebarOpen; }
            },
            {
              key: 'plan-label',
              text: `Plan: ${ app.selectedPlan }`,
              onRender: () =>
                <CommandBarItemWrapper>
                  <Text style={{ textAlign: 'center' }}>Viewing Plan: {app.selectedPlan}</Text>
                </CommandBarItemWrapper>
            },
            {
              key: 'include-unchanged',
              text: 'Include Unchanged Resources',
              iconProps: {
                // iconType: IconType.default,
                iconName: app.includeUnchangedResources ? 'Checkbox' : 'CheckboxComposite'
              },
              onClick() {
                app.includeUnchangedResources = !app.includeUnchangedResources;
              },
              canCheck: true,
              checked: app.includeUnchangedResources
            },
            {
              key: 'search-box',
              onRender: () =>
                <CommandBarItemWrapper>
                  <SearchBox {...{
                    placeholder: 'Filter',
                    iconProps: {
                      iconName: 'Filter'
                    },
                    value: app.filterText,
                  }} />
                </CommandBarItemWrapper>,
            }
          ]} />
        </Stack.Item>
        {/* Nav on the left, main pane occupying the rest */}
        <Stack.Item
          grow={1}
        >
          <Stack
            // horizontal stack
            horizontal
            // Children occupy max vertical space allowed
            verticalAlign="stretch"
            verticalFill
            gap={15}
          >
            {/* left nav */}
            {app.sidebarOpen &&
              <Stack.Item styles={{
                root: {
                  boxShadow: Depths.depth4
                }
              }}>
                <Nav {...{
                  groups: [{
                    name: 'Plans',
                    links: ['global', 'us-east-1', 'us-west-2', 'ap-northeast-1', 'ap-southeast-1'].map(planName => ({
                      name: planName,
                      url: '',
                      onClick(e) {
                        e!.preventDefault();
                        app.selectedPlan = planName;
                      },
                    }))
                  }],
                  styles: {
                    root: {
                      width: '200px'
                    }
                  }
                }} />
              </Stack.Item>
            }
            {/* the rest */}
            <Stack.Item grow={1}>
              <div style={scrollPaneWrapperStyles}>
                <ScrollablePane scrollbarVisibility={ScrollbarVisibility.auto} >
                  <Sticky isScrollSynced={true} stickyPosition={StickyPositionType.Header}>
                    <Breadcrumb items={[
                      {
                        key: '1',
                        text: 'foo'
                      },
                      {
                        key: '2',
                        text: 'bar'
                      },
                      {
                        key: '3',
                        text: 'baz'
                      }
                    ]} />
                  </Sticky>
                  <Stack
                    horizontalAlign="center"
                    styles={{
                      root: {
                        // width: '960px',
                        margin: '0 auto',
                        textAlign: 'center',
                        color: '#605e5c'
                      }
                    }}
                    gap={15}
                  >
                    <img src={logo} alt="logo" />
                    <Text variant="xxLarge" styles={boldStyle}>
                      Welcome to Your UI Fabric App {`${ app.sidebarOpen }`}
                    </Text>
                    <Text variant="large" onClick={() => { app.sidebarOpen = !app.sidebarOpen }}>For a guide on how to customize this project, check out the UI Fabric documentation.</Text>
                    <Text variant="large" styles={boldStyle}>Essential Links</Text>
                    <Stack horizontal gap={15} horizontalAlign="center">
                      <Link href="https://developer.microsoft.com/en-us/fabric">Docs</Link>
                      <Link href="https://stackoverflow.com/questions/tagged/office-ui-fabric">Stack Overflow</Link>
                      <Link href="https://github.com/officeDev/@fluentui/react/">Github</Link>
                      <Link href="https://twitter.com/officeuifabric">Twitter</Link>
                    </Stack>
                    <Text variant="large" styles={boldStyle}>Design System</Text>
                    <Stack horizontal gap={15} horizontalAlign="center">
                      <Link href="https://developer.microsoft.com/en-us/fabric#/styles/icons">Icons</Link>
                      <Link href="https://developer.microsoft.com/en-us/fabric#/styles/typography">Typography</Link>
                      <Link href="https://developer.microsoft.com/en-us/fabric#/styles/themegenerator">Theme</Link>
                    </Stack>
                    {
                      ...Array.from((function*() {
                        for(let i = 0; i < 100; i++) {
                          yield <Link href="https://developer.microsoft.com/en-us/fabric#/styles/themegenerator">Theme</Link>
                        }
                      })())
                    }
                  </Stack>
                  <Sticky isScrollSynced={true} stickyPosition={StickyPositionType.Footer}>
                    Sticky Footer
                  </Sticky>
                </ScrollablePane>
              </div>
            </Stack.Item>
          </Stack>
        </Stack.Item>
      </Stack>
    </>;
  }
};
